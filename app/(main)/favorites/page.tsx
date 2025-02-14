import { requireAuth } from '@/app/hooks/server/requireAuth';
import EmptyState from '@/components/general/EmptyState';
import JobCard from '@/components/general/JobCard';
import { prisma } from '@/lib/db';

async function getFavorites(userId: string) {
	return await prisma.savedJob.findMany({
		where: { userId: userId },
		select: {
			JobPost: {
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
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
}

export default async function FavoriteJobsPage() {
	const user = await requireAuth();
	const favorites = await getFavorites(user.id as string);

	if (favorites.length === 0) {
		return (
			<EmptyState
				heading='No Saved Jobs Found'
				href='/'
				buttonText='View Recent Jobs'
				description='You have not saved any jobs yet.'
			/>
		);
	}

	return (
		<div className='my-8'>
			<h1 className='text-xl font-semibold mb-4'>Your Saved Jobs</h1>
			<div className='grid grid-cols-1 gap-4'>
				{favorites?.map((fav) => {
					return <JobCard job={fav.JobPost} key={fav.JobPost.id} />;
				})}
			</div>
		</div>
	);
}
