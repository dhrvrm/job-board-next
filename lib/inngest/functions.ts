import { prisma } from '../db';
import { inngest } from './client';

export const helloWorld = inngest.createFunction(
	{ id: 'hello-world' },
	{ event: 'test/hello.world' },
	async ({ event, step }) => {
		await step.sleep('wait-a-moment', '1s');
		return { message: `Hello ${event.data.email}!` };
	}
);

export const handleJobExpiry = inngest.createFunction(
	{ id: 'job-expiration' },
	{ event: 'job/created' },
	async ({ event, step }) => {
		const { jobId, expirationDays } = event.data;
		await step.sleep('wait-for-job-expiration', `${expirationDays}d`);
		// await step.sleep('wait-for-job-expiration', `1m`);
		await step.run('job-mark-as-expired', async () => {
			await prisma.jobPost.update({
				where: { id: jobId },
				data: {
					status: 'EXPIRED',
				},
			});
		});

		return { jobId, message: 'Job Successfully marked as EXPIRED.' };
	}
);
