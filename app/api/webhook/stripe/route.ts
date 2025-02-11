import { prisma } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import Stripe from 'stripe';

export async function POST(req: Request) {
	const body = await req.text();
	console.log('Inside Webhook');

	const headersList = await headers();
	const signature = headersList.get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
	} catch {
		return new Response('Webhook Error: ', { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	if (event.type === 'checkout.session.completed') {
		const customerId = session.customer;
		const jobId = session.metadata?.jobId;

		if (!jobId || !customerId) {
			return new Response('Job or Customer Id Missing', { status: 400 });
		}

		const company = await prisma.user.findUnique({
			where: {
				stripeCustomerId: customerId as string,
			},
			select: {
				Company: {
					select: {
						id: true,
					},
				},
			},
		});

		if (!company) {
			return new Response('Company not found for user', { status: 400 });
		}

		await prisma.jobPost.update({
			where: {
				id: jobId,
				companyId: company?.Company?.id as string,
			},
			data: {
				status: 'ACTIVE',
			},
		});
	}

	return new Response(null, { status: 200 });
}
