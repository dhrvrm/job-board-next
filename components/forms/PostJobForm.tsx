/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { JobPostSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectGroup,
	SelectContent,
	SelectItem,
	SelectLabel,
} from '@/components/ui/select';
import { countryList as countries } from '@/lib/countrieslist';
import SalaryRangeSelector from '@/components/general/SalaryRangeSelector';
import { JobDescriptionEditor } from '@/components/richTextEditor/JobDescriptionEditor';
import BenefitsSelector from '@/components/general/BenefitsSelector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import JobListingDurationSelector from '@/components/general/JobListingDurationSelector';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createJobPost } from '@/app/actions';
import { LoaderCircle } from 'lucide-react';

type Props = {
	companyAbout: string;
	companyLocation: string;
	companyLogo: string;
	companyName: string;
	companyWebsite: string;
};
const PostJobForm = ({
	companyAbout,
	companyLocation,
	companyLogo,
	companyName,
	companyWebsite,
}: Props) => {
	const form = useForm<z.infer<typeof JobPostSchema>>({
		resolver: zodResolver(JobPostSchema),
		defaultValues: {
			jobTitle: '',
			employmentType: '',
			location: '',
			jobDescription: '',
			salaryFrom: 0,
			salaryTo: 0,
			listingDuration: 30,
			benefits: [],

			// companyName: '',
			// companyLocation: '',
			// companyAbout: '',
			// companyLogo: '',
			// companyWebsite: '',
			// companyXAccount: '',
		},
	});
	const [pending, setPending] = useState(false);

	async function handleCreatePost(data: z.infer<typeof JobPostSchema>) {
		try {
			setPending(true);

			await createJobPost(data);
			console.log(data);
		} catch (error) {
			if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
				console.log('Something went wrong in form submission', error);
			}
		} finally {
			setPending(false);
		}
	}

	return (
		<Form {...form}>
			<form className='w-full' onSubmit={form.handleSubmit(handleCreatePost)}>
				<div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
					<FormField
						control={form.control}
						name='jobTitle'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Job Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Enter Job Title' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='employmentType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Employment Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select Employment Type'></SelectValue>
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Employment Type</SelectLabel>
											<SelectItem value='full-time'>Full Time</SelectItem>
											<SelectItem value='part-time'>Part Time</SelectItem>
											<SelectItem value='contract'>Contract</SelectItem>
											<SelectItem value='internship'>Internship</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='location'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Job Location</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select a location' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Worldwide</SelectLabel>
											<SelectItem value='worldwide'>
												<span>🌍</span>
												<span className='pl-2'>Worldwide/ Remote</span>
											</SelectItem>
										</SelectGroup>
										<SelectGroup>
											<SelectLabel>Countries</SelectLabel>
											{countries.map((country) => (
												<SelectItem key={country.code} value={country.name}>
													<span>{country.name}</span>
													<span className='text-xs ml-2'>
														{country.flagEmoji}
													</span>
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormItem>
						<FormLabel>Salary Range</FormLabel>
						<FormControl>
							<SalaryRangeSelector
								control={form.control}
								minSalary={5000}
								maxSalary={3000000}
								currency='USD'
								step={1000}
							/>
						</FormControl>
						<FormMessage>
							{form.formState.errors.salaryFrom?.message ||
								form.formState.errors.salaryTo?.message}
						</FormMessage>
					</FormItem>

					<div className='lg:col-span-2'>
						<FormField
							control={form.control}
							name='jobDescription'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Job Description</FormLabel>
									<FormControl>
										<JobDescriptionEditor field={field as any} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='lg:col-span-2'>
						<FormField
							control={form.control}
							name='benefits'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Benefits</FormLabel>
									<FormControl>
										<BenefitsSelector field={field as any} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className='lg:col-span-2'>
						<FormField
							control={form.control}
							name='listingDuration'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Duration</FormLabel>
									<FormDescription>
										How many days you want your Job Listing to be visbile?
									</FormDescription>
									<FormControl>
										<JobListingDurationSelector field={field as any} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Card className='mt-8 w-fit'>
					<CardHeader>
						<CardTitle>Company Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex flex-wrap gap-4'>
							<Image
								src={companyLogo}
								height={50}
								width={50}
								alt={companyName}
								className='rounded-sm'
							/>
							<div className='flex flex-col gap-2'>
								<span className='text-md  '>{companyName}</span>
								<span className='text-sm text-muted-foreground'>
									{companyLocation}
								</span>
							</div>
							<div className='flex flex-col gap-2'>
								<span className='text-sm text-muted-foreground'>
									{companyWebsite}
								</span>
								<span className='text-xs text-muted-foreground'>
									{companyAbout?.slice(0, 40)}...
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Button type='submit' disabled={pending} className='mt-8 w-full'>
					{pending ? (
						<span className='flex gap-2 justify-center items-center'>
							<LoaderCircle className='animate-spin' /> Going to Payments
							Page...
						</span>
					) : (
						'Proceed to Payment'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default PostJobForm;
