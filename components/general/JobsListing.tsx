import { prisma } from '@/lib/db';
import EmptyState from './EmptyState';
import JobCard from './JobCard';
import MainPagintation from './MainPagintation';

async function getJobs(pageNumber: number = 1, pageSize: number = 1) {
	const [data, count] = await Promise.all([
		prisma.jobPost.findMany({
			where: {
				status: 'ACTIVE',
			},
			take: pageSize,
			skip: pageSize * (pageNumber - 1),
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

		prisma.jobPost.count({ where: { status: 'ACTIVE' } }),
	]);

	return { jobs: data, totalPages: Math.ceil(count / pageSize) };
}

const JobsListing = async ({currentPage}: {currentPage: number}) => {
	const { jobs, totalPages } = await getJobs(currentPage);

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
