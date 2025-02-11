'use server';

import {
	CompanySchema,
	JobPostSchema,
	JobSeekerSchema,
} from '@/lib/zodSchemas';
import { z } from 'zod';
import { requireAuth } from './hooks/server/requireAuth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import arcjet, { detectBot, shield } from '@/lib/arcjet';
import { request } from '@arcjet/next';
import { stripe } from '@/lib/stripe';
import { jobListingDurationPricing } from '@/lib/priceTiers';
import { inngest } from '@/lib/inngest/client';

const aj = arcjet
	.withRule(
		shield({
			mode: 'LIVE', //DRU_RUN in Dev Mode
		})
	)
	.withRule(
		detectBot({
			mode: 'LIVE',
			allow: ['CATEGORY:SEARCH_ENGINE'],
		})
	);

export async function createCompany(data: z.infer<typeof CompanySchema>) {
	const user = await requireAuth();
	console.log('Got inside a company action: ', user?.id);

	const req = await request();
	const descision = await aj.protect(req);

	if (descision.isDenied()) {
		throw new Error('Forbidden');
	}

	const validatedData = CompanySchema.safeParse(data);

	if (!validatedData.success) {
		throw new Error('Invalid data: ', validatedData.error);
	}

	try {
		await prisma.user.update({
			where: {
				id: user?.id,
			},
			data: {
				onBoardingCompleted: true,
				userType: 'COMPANY',
				Company: {
					create: {
						...validatedData.data,
					},
				},
			},
		});

		// Add a redirect after successful creation
		redirect('/'); // Import redirect from 'next/navigation'
	} catch (error) {
		if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
			console.error('Database error:', error);
			throw new Error('Failed to create company');
		} else {
			redirect('/');
		}
	}
}

export async function createJobSeeker(data: z.infer<typeof JobSeekerSchema>) {
	const user = await requireAuth();
	console.log('Got inside a jobseeker action: ', user?.id);

	const req = await request();
	const descision = await aj.protect(req);

	if (descision.isDenied()) {
		throw new Error('Forbidden');
	}

	const validatedData = JobSeekerSchema.safeParse(data);

	if (!validatedData.success) {
		throw new Error('Invalid data: ', validatedData.error);
	}

	try {
		await prisma.user.update({
			where: {
				id: user?.id,
			},
			data: {
				onBoardingCompleted: true,
				userType: 'JOB_SEEKER',
				JobSeeker: {
					create: {
						...validatedData.data,
					},
				},
			},
		});

		// Add a redirect after successful creation
		redirect('/'); // Import redirect from 'next/navigation'
	} catch (error) {
		if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
			console.error('Database error:', error);
			throw new Error('Failed to create job seeker');
		} else {
			redirect('/');
		}
	}
}

export async function createJobPost(data: z.infer<typeof JobPostSchema>) {
	const user = await requireAuth();
	console.log('Got inside a Job Post action: ', user?.id);

	const req = await request();
	const descision = await aj.protect(req);

	if (descision.isDenied()) {
		throw new Error('Forbidden');
	}

	const validatedData = JobPostSchema.safeParse(data);

	if (!validatedData.success) {
		throw new Error('Invalid data: ', validatedData.error);
	}

	const company = await prisma.company.findUnique({
		where: { userId: user.id },
		select: {
			id: true,
			user: {
				select: {
					stripeCustomerId: true,
				},
			},
		},
	});

	if (!company?.id) {
		return redirect('/');
	}

	let stripeCustomerId = company.user.stripeCustomerId;

	if (!stripeCustomerId) {
		const customer = await stripe.customers.create({
			name: user.name as string,
			email: user.email as string,
		});

		stripeCustomerId = customer.id;

		await prisma.user.update({
			where: { id: user.id },
			data: {
				stripeCustomerId: customer.id,
			},
		});
	}

	const jobPost = await prisma.jobPost.create({
		data: {
			jobTitle: validatedData.data.jobTitle,
			jobDescription: validatedData.data.jobDescription,
			location: validatedData.data.location,
			employmentType: validatedData.data.employmentType,
			salaryFrom: validatedData.data.salaryFrom,
			salaryTo: validatedData.data.salaryTo,
			listingDuration: validatedData.data.listingDuration,
			benefits: validatedData.data.benefits,
			companyId: company.id,
		},
		select: {
			id: true,
		},
	});

	const currentTier = jobListingDurationPricing.find(
		(tier) => tier.days === validatedData.data.listingDuration
	);

	if (!currentTier) {
		throw new Error('Pricing Tier not found');
	}

	await inngest.send({
		name: 'job/created',
		data: {
			jobId: jobPost.id,
			expirationDays: currentTier.days,
		},
	});

	const session = await stripe.checkout.sessions.create({
		customer: stripeCustomerId,
		line_items: [
			{
				price_data: {
					product_data: {
						name: `Job Post - ${currentTier.days} days`,
						description: currentTier.description,
						images: [
							'https://github.com/dhrvrm/job-board-next/blob/main/public/logo.png?raw=true',
						],
					},
					currency: 'USD',
					unit_amount: currentTier.price * 100,
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/failure`,
		metadata: {
			jobId: jobPost.id,
		},
	});

	return redirect(session.url as string);
}
