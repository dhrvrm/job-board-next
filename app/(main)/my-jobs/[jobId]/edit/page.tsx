import { requireAuth } from '@/app/hooks/server/requireAuth';
import EditJobForm from '@/components/forms/EditJobForm';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

type Params = Promise<{ jobId: string }>;

async function getJobData(userId: string, jobId: string) {
	const job = await prisma.jobPost.findUnique({
		where: { id: jobId, Company: { userId: userId } },
		select: {
			id: true,
			jobTitle: true,
			jobDescription: true,
			salaryFrom: true,
			salaryTo: true,
			employmentType: true,
            location: true,
			benefits: true,
			listingDuration: true,
		},
	});

    if(!job){
        return notFound();
    }

	return job;
}

export default async function EditCreatedJobPage({
	params,
}: {
	params: Params;
}) {
	const user = await requireAuth();
	const { jobId } = await params;
	const job = await getJobData(user.id as string, jobId);
	return <div className='my-8'><EditJobForm job={job}/></div>;
}
