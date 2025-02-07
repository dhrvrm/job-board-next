import { z } from 'zod';

export const CompanySchema = z.object({
	name: z
		.string()
		.min(2, 'Enter your full company name')
		.max(255, 'Company name is too long'),
	location: z
		.string()
		.min(2, 'Enter your company location')
		.max(255, 'Company location is too long'),
	about: z
		.string()
		.min(2, 'Enter a brief description of your company')
		.max(512, 'Company description is too long'),
	logo: z.string().url('Please upload a logo for your company'),
	website: z.string().url('Enter a valid URL'),
	xAccount: z.string().optional(),
});

export const JobSeekerSchema = z.object({
	name: z.string().min(2, 'Enter your full name').max(255, 'Name is too long'),
	about: z
		.string()
		.min(12, 'Enter a brief description about yourself')
		.max(512, 'Description is too long'),
	resume: z.string().url('Please upload your resume'),
});
