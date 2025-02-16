import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { MapPin, Building2, BanknoteIcon } from 'lucide-react';

import { getFormatedCurrency } from '@/utils/formatCurrency';
import { formatRelativeTime } from '@/utils/formatRelativeTime';
import { Avatar, AvatarFallback } from '../ui/avatar';

type Props = {
	job: {
		id: string;
		Company: {
			name: string;
			location: string;
			about: string;
			logo: string;
		};
		jobTitle: string;
		employmentType: string;
		location: string;
		salaryFrom: number;
		salaryTo: number;
		jobDescription: string;
		benefits: string[];
		createdAt: Date;
	};
};

const JobCard = ({ job }: Props) => {
	const { Company: company } = job;

	// const getEmploymentTypeName = (value: string) => {
	// 	return jobTypes?.find((type) => type.value === value)?.name || value;
	// };

	return (
		<Link
			href={`job/${job.id}`}
			className='block transition-transform hover:scale-[1.02]'
		>
			<Card className=' hover:border-primary relative hover:shadow-md transition-all duration-200'>
				<CardHeader className='space-y-0'>
					<div className='flex items-start gap-4'>
						<div className='relative h-12 w-12 flex-shrink-0'>
							{company.logo ? (
								<Image
									src={company.logo}
									alt={company.name}
									width={48}
									height={48}
									className='size-12 rounded-lg'
								/>
							) : (
								<div className=' size-12 rounded-lg flex items-center justify-center'>
									<Avatar className='size-12 rounded-sm'>
										<AvatarFallback>
											{company.name.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								</div>
							)}
						</div>
						<div className='flex-1 space-y-1'>
							<h2 className='font-semibold text-xl text-foreground'>
								{job.jobTitle}
							</h2>
							<div className='flex items-center text-muted-foreground'>
								<Building2 className='w-4 h-4 mr-1' />
								<span className='text-sm'>{company.name}</span>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<div className='space-y-2'>
						<div className='flex gap-4'>
							<div className='flex items-center text-muted-foreground'>
								<MapPin className='w-4 h-4 mr-1' />
								<span className='text-sm'>{job.location}</span>
							</div>
							<div className='flex items-center text-muted-foreground gap-4'>
								<Badge
									variant='default'
									className='text-xs font-normal capitalize'
								>
									{job.employmentType.replaceAll('-', ' ').toLowerCase()}
								</Badge>
								<span className='text-sm'>
									{formatRelativeTime(job.createdAt)}
								</span>
							</div>
						</div>

						<div className='flex items-center text-muted-foreground'>
							<BanknoteIcon className='w-4 h-4 mr-1' />
							<span className='text-sm'>
								{getFormatedCurrency(job.salaryFrom)} -{' '}
								{getFormatedCurrency(job.salaryTo)} / year
							</span>
						</div>

						{/* <p className='text-sm text-muted-foreground line-clamp-2'>
							{job.jobDescription}
						</p> */}

						{job.benefits.length > 0 && (
							<div className='flex flex-wrap gap-2'>
								{job.benefits.slice(0, 3).map((benefit, index) => (
									<Badge
										key={index}
										variant='secondary'
										className='text-xs font-normal'
									>
										{benefit.replaceAll('_', ' ').toUpperCase()}
									</Badge>
								))}
								{job.benefits.length > 3 && (
									<span className='text-xs text-muted-foreground'>
										+{job.benefits.length - 3} more
									</span>
								)}
							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default JobCard;
