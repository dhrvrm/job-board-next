import { prisma } from '@/lib/db';
import EmptyState from './EmptyState';
import JobCard from './JobCard';

async function getJobs() {
	const data = prisma.jobPost.findMany({
		where: {
			status: 'ACTIVE',
		},
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
	});

	return data;
}

const JobsListing = async () => {
	const jobs = await getJobs();

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
		</div>
	);
};

export default JobsListing;
