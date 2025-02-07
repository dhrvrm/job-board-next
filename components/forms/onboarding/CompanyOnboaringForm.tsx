'use client';
import { useState } from 'react';
import { CompanySchema } from '@/lib/zodSchemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/components/general/UploaderReexported';
import { createCompany } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { LoaderCircle, XIcon } from 'lucide-react';
import Image from 'next/image';

const CompanyOnboaringForm = () => {
	const form = useForm<z.infer<typeof CompanySchema>>({
		resolver: zodResolver(CompanySchema),
		defaultValues: {
			name: '',
			about: '',
			location: '',
			logo: '',
			website: '',
			xAccount: '',
		},
	});
	const [pending, setPending] = useState(false);

	async function onSubmit(data: z.infer<typeof CompanySchema>) {
		try {
			setPending(true);

			await createCompany(data);
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
					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company&apos;s Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter your company name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='location'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company&apos;s Location</FormLabel>
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
													<span>🌍</span> Worldwide/Remote
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
					</div>

					<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
						<FormField
							control={form.control}
							name='website'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Website URL</FormLabel>
									<FormControl>
										<Input
											placeholder='URL e.g. https://example.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='xAccount'
							render={({ field }) => (
								<FormItem>
									<FormLabel>X(Twitter) URL</FormLabel>
									<FormControl>
										<Input
											placeholder='URL e.g. https://x.com/company'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1'>
						<FormField
							control={form.control}
							name='about'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company&apos;s About</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Tell us about your company ...'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid grid-cols-1'>
						<FormField
							control={form.control}
							name='logo'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company&apos;s Logo</FormLabel>
									<FormControl>
										<div>
											{field.value ? (
												<div className='flex flex-col relative w-fit'>
													<div className='relative w-[100px] h-[100px]'>
														<div className='absolute inset-0 bg-muted animate-pulse' />{' '}
														{/* Shimmer */}
														<Image
															src={field.value}
															alt='Company Logo'
															width={100}
															height={100}
															className='relative'
															onLoadingComplete={(img) => {
																img.classList.remove('opacity-0');
															}}
															onLoad={(e) => {
																const target = e.target as HTMLImageElement;
																target.classList.remove('opacity-0');
															}}
														/>
													</div>
													<Button
														variant='destructive'
														size='sm'
														className='absolute -top-2 -right-2 w-fit'
														onClick={(e) => {
															e.preventDefault();
															field.onChange('');
														}}
													>
														<XIcon />
													</Button>
												</div>
											) : (
												<UploadDropzone
													endpoint='imageUploader'
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

export default CompanyOnboaringForm;
