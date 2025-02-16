'use client';
import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem,
} from '../ui/select';
import { countryList as countries } from '@/lib/countrieslist';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const jobTypes = [
	{
		id: 1,
		name: 'Full Time',
		value: 'full-time',
	},
	{
		id: 2,
		name: 'Part Time',
		value: 'part-time',
	},
	{
		id: 3,
		name: 'Contract',
		value: 'contract',
	},
	{
		id: 4,
		name: 'Internship',
		value: 'internship',
	},
];

const JobsFilter = () => {
	const searchParams = useSearchParams();

	const currentJobTypes = searchParams.get('jobTypes')?.split(',') || [];
	const currentLocation = searchParams.get('location') || '';

	const router = useRouter();

	function clearAllFilters() {
		router.push('/');
	}
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set(name, value);
			} else {
				params.delete(name);
			}
			params.set('page', '1');
			return params.toString();
		},
		[searchParams]
	);

	function handleJobTypeChange(jobType: string, checked: boolean) {
		const typeSet = new Set(currentJobTypes);

		if (checked) {
			typeSet.add(jobType);
		} else {
			typeSet.delete(jobType);
		}

		const newValue = Array.from(typeSet).join(',');

		router.push(`?${createQueryString('jobTypes', newValue)}`);
	}

	function handleLocationChange(location: string) {
		router.push(`?${createQueryString('location', location)}`);
	}

	return (
		<Card className='h-fit'>
			<CardHeader>
				<CardTitle className='w-full flex justify-between'>
					<h2 className=' text-2xl '>Filters</h2>
					<Button
						variant={'destructive'}
						size={'sm'}
						className='h-8 flex items-center'
						onClick={clearAllFilters}
					>
						<XIcon /> Clear Filters
					</Button>
				</CardTitle>
			</CardHeader>
			<Separator />

			<CardContent className='space-y-6 mt-4 w-full'>
				<div>
					<Label className='text-lg font-semibold'>Job Types</Label>
					<div className='gap-2 mt-4 grid grid-cols-3 lg:grid-cols-2'>
						{jobTypes.map((job) => (
							<div key={job.id}>
								<Checkbox
									id={job.value}
									checked={currentJobTypes.includes(job.value)}
									onCheckedChange={(checked) => {
										handleJobTypeChange(job.value, checked as boolean);
									}}
								/>
								<Label htmlFor={job.value} className='text-sm font-medium ml-2'>
									{job.name}
								</Label>
							</div>
						))}
					</div>
				</div>

				<Separator />

				<div className='flex flex-col gap-4'>
					<Label className='text-lg font-semibold'>Location</Label>
					<Select
						value={currentLocation}
						onValueChange={(location) => {
							handleLocationChange(location);
						}}
					>
						<SelectTrigger>
							<SelectValue placeholder='Select a location' />
						</SelectTrigger>
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
										<span className='text-xs ml-2'>{country.flagEmoji}</span>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
};

export default JobsFilter;
