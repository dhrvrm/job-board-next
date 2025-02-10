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

export const JobPostSchema = z.object({
	jobTitle: z
		.string()
		.min(2, 'Enter the job title')
		.max(255, 'Job title is too long'),
	employmentType: z
		.string()
		.min(2, 'Enter the employment type')
		.max(255, 'Employment type is too long'),
	location: z
		.string()
		.min(2, 'Enter the job location')
		.max(255, 'Job location is too long'),
	salaryFrom: z.number().int().min(0, 'Salary must be a positive integer'),
	salaryTo: z.number().int().min(0, 'Salary must be a positive integer'),
	// currency: z.string(),
	jobDescription: z
		.string()
		.min(12, 'Enter a job description')
		.max(2048, 'Job description is too long'),
	listingDuration: z
		.number()
		.int()
		.min(1, 'Listing duration must be at least 1 day'),
	benefits: z.array(z.string()).min(1, 'You should have atleast one benefit'),

	// companyName: z
	// 	.string()
	// 	.min(2, 'Enter your full company name')
	// 	.max(255, 'Company name is too long'),
	// companyLocation: z
	// 	.string()
	// 	.min(2, 'Enter your company location')
	// 	.max(255, 'Company location is too long'),
	// companyAbout: z
	// 	.string()
	// 	.min(2, 'Enter a brief description of your company')
	// 	.max(512, 'Company description is too long'),
	// companyLogo: z.string().url('Please upload a logo for your company'),
	// companyWebsite: z.string().url('Enter a valid URL'),
	// companyXAccount: z.string().optional(),
});
