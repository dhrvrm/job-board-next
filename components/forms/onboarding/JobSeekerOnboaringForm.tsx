'use client';

import { createJobSeeker } from '@/app/actions';
import { UploadDropzone } from '@/components/general/UploaderReexported';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { JobSeekerSchema } from '@/lib/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, XIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const JobSeekerOnboaringForm = () => {
	const form = useForm<z.infer<typeof JobSeekerSchema>>({
		resolver: zodResolver(JobSeekerSchema),
		defaultValues: {
			name: '',
			about: '',
			resume: '',
		},
	});

	const [pending, setPending] = useState(false);

	async function onSubmit(data: z.infer<typeof JobSeekerSchema>) {
		try {
			setPending(true);

			await createJobSeeker(data);
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
		<>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='grid grid-cols-1 '>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter your name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1 '>
						<FormField
							control={form.control}
							name='about'
							render={({ field }) => (
								<FormItem>
									<FormLabel>About You</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Tell us about yourself ...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1 '>
						<FormField
							control={form.control}
							name='resume'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Resume (PDF)</FormLabel>
									<FormControl>
										<div>
											{field.value ? (
												<div className='flex flex-col relative w-fit'>
													<p className='text-xs text-green-400 mr-2'>
														Uploaded: {field.value && field.value?.slice(0, 30)}
														....
													</p>
													<Button
														size='sm'
														variant='destructive'
														onClick={() => field.onChange('')}
													>
														<XIcon />
													</Button>
												</div>
											) : (
												<UploadDropzone
													endpoint='resumeUploader'
													onClientUploadComplete={(res) => {
														field.onChange(res[0].url);
														console.log(res[0].url);
													}}
													onUploadError={(err) => {
														console.error(err);
													}}
													className='w-full ut-button:bg-primary cursor-pointer ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary'
												/>
											)}
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' disabled={pending} className='w-full'>
						{pending ? (
							<span className='flex gap-2 justify-center items-center'>
								<LoaderCircle className='animate-spin' /> Submitting...
							</span>
						) : (
							'Continue'
						)}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default JobSeekerOnboaringForm;
