import { prisma } from '@/lib/db';
import EmptyState from './EmptyState';
import JobCard from './JobCard';
import MainPagintation from './MainPagintation';
import { JobPostStatus } from '@prisma/client';

async function getJobs({
	pageNumber = 1,
	pageSize = 2,
	jobTypes = [],
	location = '',
}: {
	pageNumber: number;
	pageSize: number;
	jobTypes: string[];
	location: string;
}) {
	const skip = pageSize * (pageNumber - 1);
	const where = {
		status: JobPostStatus.ACTIVE,
		...(jobTypes.length > 0 && {
			employmentType: {
				in: jobTypes,
			},
		}),
		...(location &&
			location !== 'worldwide' && {
				location: location,
			}),
	};
	const [data, count] = await Promise.all([
		prisma.jobPost.findMany({
			where: where,
			take: pageSize,
			skip: skip,
			select: {
				id: true,
				jobTitle: true,
				jobDescription: true,
				employmentType: true,
				location: true,
				salaryFrom: true,
				salaryTo: true,
				benefits: true,
				createdAt: true,
				Company: {
					select: {
						name: true,
						logo: true,
						about: true,
						location: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		}),

		prisma.jobPost.count({ where: where }),
	]);

	return { jobs: data, totalPages: Math.ceil(count / pageSize) };
}

const JobsListing = async ({
	currentPage,
	jobTypes,
	location,
}: {
	currentPage: number;
	jobTypes: string[];
	location: string;
}) => {
	const { jobs, totalPages } = await getJobs({
		pageNumber: currentPage,
		pageSize: 2,
		jobTypes,
		location,
	});

	if (jobs?.length === 0) {
		return (
			<EmptyState
				heading='No Jobs Posted Yet'
				description='Try clearing filters, to see more results :p'
				buttonText='Reset all filters'
				href='/'
			/>
		);
	}
	return (
		<div className='grid gap-6 grid-cols-1 lg:col-span-2'>
			{jobs?.map((job) => (
				<JobCard key={job.id} job={job} />
			))}
			<MainPagintation currentPage={currentPage} totalPages={totalPages} />
		</div>
	);
};

export default JobsListing;
