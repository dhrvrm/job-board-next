import { prisma } from '../db';
import { inngest } from './client';
import { resend } from '@/lib/resend';

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

export const jobsUpdateMail = inngest.createFunction(
	{ id: 'send-jobs-listing' },
	{ event: 'jobseeker/created' },
	async ({ event, step }) => {
		const { userId, email } = event.data;
		const totalDays = 30;
		const intervalOfDays = 2;
		let currentDay = 0;

		while (currentDay <= totalDays) {
			const recentJobs = await step.run('fetch-recent-jobs', async () => {
				return await prisma.jobPost.findMany({
					where: {
						status: 'ACTIVE',
					},
					take: 5,
					include: {
						Company: {
							select: {
								name: true,
							},
						},
					},
					orderBy: {
						createdAt: 'desc',
					},
				});
			});

			if (recentJobs.length > 0) {
				await step.run('send-recent-jobs', async () => {
					const htmlContent = `
			  <!DOCTYPE html>
			  <html>
				<head>
				  <meta charset="utf-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>Latest Job Opportunities</title>
				</head>
				<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
				  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px;">
					<!-- Header with Logo -->
					<div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #FFC107;">
					  <h1 style="color: #333; margin: 0; font-size: 28px;">
						<span style="color: #FFC107;">Direct</span> Hire
					  </h1>
					  <p style="color: #666; margin: 10px 0 0;">Latest Job Opportunities</p>
					</div>
  
					<!-- Introduction -->
					<div style="padding: 20px 0;">
					  <p style="color: #666; margin: 0;">Here are the latest job opportunities that match your profile:</p>
					</div>
  
					<!-- Job Listings -->
					<div style="padding: 20px 0;">
					  ${recentJobs
							.map(
								(job) => `
							<div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; margin-bottom: 15px;">
							  <h2 style="color: #333; margin: 0 0 10px; font-size: 18px;">${
									job.jobTitle
								}</h2>
							  <p style="color: #666; margin: 5px 0;">
								<strong>Company:</strong> ${job.Company.name}
							  </p>
							  <p style="color: #666; margin: 5px 0;">
								<strong>Location:</strong> ${job.location}
							  </p>
							  <p style="color: #666; margin: 5px 0;">
								<strong>Salary:</strong> Up to $${job.salaryTo.toLocaleString()}
							  </p>
							  <a href="${process.env.NEXT_PUBLIC_URL}/job/${job.id}" 
								style="display: inline-block; background-color: #FFC107; color: #000; padding: 8px 15px; text-decoration: none; border-radius: 4px; margin-top: 10px;">
								View Job
							  </a>
							</div>
						  `
							)
							.join('')}
					</div>
  
					<!-- Footer -->
					<div style="text-align: center; padding-top: 20px; border-top: 1px solid #e0e0e0;">
					  <p style="color: #666; margin: 0;">
						You're receiving this email because you subscribed to job alerts from Direct Hire.
					  </p>
					  <p style="color: #666; margin: 10px 0;">
						<a href="${
							process.env.NEXT_PUBLIC_URL
						}/settings" style="color: #FFC107; text-decoration: none;">
						  Manage your preferences
						</a>
						&nbsp;|&nbsp;
						<a href="${
							process.env.NEXT_PUBLIC_URL
						}/unsubscribe" style="color: #FFC107; text-decoration: none;">
						  Unsubscribe
						</a>
					  </p>
					</div>
				  </div>
				</body>
			  </html>
			`;

					await resend.emails.send({
						from: 'Direct Hire <jobs@updates.vaayudigital.in>',
						to: email,
						subject: 'New Job Opportunities for You',
						html: htmlContent
					});
				});

				await step.sleep('wait-for-next-email-day', `${intervalOfDays}d`);
				currentDay += intervalOfDays;
			}
		}
		return {
			userId,
			message:
				'Notifications of Job Listings completed, rerun if user is active.',
		};
	}
);
