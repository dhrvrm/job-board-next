'use server';

import { CompanySchema, JobSeekerSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import { requireAuth } from './hooks/server/requireAuth';
import { prisma } from '@/lib/db';
import { redirect } from 'next/navigation';
import arcjet, { detectBot, shield } from '@/lib/arcjet';
import { request } from '@arcjet/next';

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
