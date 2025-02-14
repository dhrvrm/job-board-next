'use client';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { JobPostSchema } from '@/lib/zodSchemas';
import { z } from 'zod';
import {
	Form,
	FormControl,
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
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { updateJobPost } from '@/app/actions';

type Props = {
	job: {
		id: string;
		jobTitle: string;
		employmentType: string;
		location: string;
		salaryFrom: number;
		salaryTo: number;
		jobDescription: string;
		benefits: string[];
		listingDuration: number;
	};
};

const EditJobForm = ({ job }: Props) => {
	const [pending, setPending] = useState(false);

	const form = useForm<z.infer<typeof JobPostSchema>>({
		resolver: zodResolver(JobPostSchema),
		defaultValues: {
			jobTitle: job.jobTitle,
			employmentType: job.employmentType,
			location: job.location,
			jobDescription: job.jobDescription,
			salaryFrom: job.salaryFrom,
			salaryTo: job.salaryTo,
			benefits: job.benefits,
			listingDuration: job.listingDuration,
		},
	});

	async function handleEditPost(data: z.infer<typeof JobPostSchema>) {
		try {
			setPending(true);
			await updateJobPost(data, job.id);
		} catch (error) {
			if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
				console.error('Error updating job post:', error);
			}
		} finally {
			setPending(false);
		}
	}

	return (
		<Form {...form}>
			<form
				className='w-full space-y-6'
				onSubmit={form.handleSubmit(handleEditPost)}
			>
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
											<SelectValue placeholder='Select Employment Type' />
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
										<JobDescriptionEditor field={field} />
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
										<BenefitsSelector field={field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type='submit' disabled={pending} className='w-full'>
					{pending ? (
						<span className='flex gap-2 justify-center items-center'>
							<LoaderCircle className='animate-spin' /> Saving Changes...
						</span>
					) : (
						'Save Changes'
					)}
				</Button>
			</form>
		</Form>
	);
};

export default EditJobForm;
