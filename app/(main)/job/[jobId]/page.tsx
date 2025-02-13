import { saveJob, unsaveJob } from '@/app/actions';
import { SaveJobButton } from '@/components/general/SubmitButton';
import JSONtoHTMLView from '@/components/richTextEditor/JSONtoHTMLView';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import arcjet, { detectBot, fixedWindow } from '@/lib/arcjet';
import { auth } from '@/lib/auth';
import { benefits } from '@/lib/benefitList';
import { prisma } from '@/lib/db';
import { request } from '@arcjet/next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const aj = arcjet
	.withRule(
		detectBot({
			mode: 'DRY_RUN',
			allow: ['CATEGORY:SEARCH_ENGINE', 'CATEGORY:PREVIEW'],
		})
	)
	.withRule(fixedWindow({ mode: 'DRY_RUN', max: 10, window: '60s' }));

async function getJob(jobId: string, userId?: string) {
	const [jobData, savedJob] = await Promise.all([
		await prisma.jobPost.findUnique({
			where: {
				status: 'ACTIVE',
				id: jobId,
			},
			select: {
				jobTitle: true,
				jobDescription: true,
				benefits: true,
				employmentType: true,
				salaryFrom: true,
				salaryTo: true,
				location: true,
				listingDuration: true,
				createdAt: true,
				Company: {
					select: {
						name: true,
						logo: true,
						location: true,
						about: true,
					},
				},
			},
		}),

		userId
			? prisma.savedJob.findUnique({
					where: {
						userId_jobPostId: {
							userId: userId as string,
							jobPostId: jobId,
						},
					},
					select: { id: true },
			  })
			: null,
	]);

	if (!jobData) {
		return notFound();
	}
	return { jobData, savedJob };
}

type Params = Promise<{ jobId: string }>;

export default async function JobDetailsPage({ params }: { params: Params }) {
	const req = await request();
	const decision = await aj.protect(req);

	if (decision.isDenied()) {
		throw new Error('Too much activity');
	}

	const { jobId } = await params;
	const session = await auth();

	const { jobData: job, savedJob } = await getJob(jobId, session?.user?.id);

	return (
		<div className='grid lg:grid-cols-[1fr,400px] gap-8 my-8'>
			<div className='space-y-8'>
				<div className='flex items-center justify-between gap-4'>
					<div className='flex flex-col gap-2'>
						<div className='flex items-end gap-4'>
							<Image
								src={job.Company.logo}
								width={48}
								height={48}
								objectFit='contain'
								alt={job.Company.name}
								className='size-12 rounded-sm'
							/>
							<div>
								<h1 className='text-xl lg:text-3xl font-semibold'>
									{job.jobTitle}
								</h1>
								<p className='text-muted-foreground text-sm'>
									{job.Company.name} • {job.location}
								</p>
							</div>
						</div>
						<div className='flex items-center gap-2 mt-2'>
							<Badge
								className='text-sm capitalize rounded-full'
								variant={'secondary'}
							>
								{job.employmentType.replaceAll('-', ' ')}
							</Badge>
						</div>
					</div>
					<div></div>
				</div>
				<section>
					<h2 className='text-xl mb-4 font-medium border-b-2 border-primary w-fit'>
						Job Description
					</h2>
					<JSONtoHTMLView jsonData={JSON.parse(job.jobDescription)} />
				</section>
				<section>
					<h2 className='text-xl mb-4 font-medium border-b-2 border-primary w-fit'>
						Job Benefits
					</h2>
					<div className='flex flex-wrap gap-4'>
						{job.benefits?.map((bValue) => {
							const benefit = benefits.find((b) => b.id === bValue);
							if (!benefit) {
								return null;
							}
							return (
								<Badge
									key={benefit.id}
									className='cursor-pointer select-none text-sm px-4 py-1.5 rounded-full'
								>
									<span className='flex items-center gap-2'>
										{benefit.icon}
										{benefit.label}
									</span>
								</Badge>
							);
						})}
					</div>
				</section>
			</div>
			<div className='space-y-8'>
				<Card>
					<CardHeader>
						<h2 className='text-xlfont-medium'>Apply Now</h2>
						<p className='text-sm text-muted-foreground'>
							Please let {job.Company.name} know, you are interested in this
							job.
						</p>
					</CardHeader>
					<CardContent className='flex flex-wrap gap-4'>
						{session?.user?.id ? (
							<>
								<form
								// action={async () => {
								// 	'use server';
								// 	// await applyForJob()
								// }}
								>
									<Button type='submit'> Apply Now</Button>
								</form>
								<form
									action={
										savedJob
											? unsaveJob.bind(null, savedJob.id)
											: saveJob.bind(null, jobId)
									}
								>
									<SaveJobButton savedJob={!!savedJob} />
								</form>
							</>
						) : (
							<Link href={'/login'} className={buttonVariants()}>
								Login to Continue
							</Link>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<h2 className='text-xlfont-medium'>About this job</h2>
						<p className='text-sm text-muted-foreground'>
							You can find details about this job below.
						</p>
					</CardHeader>
					<CardContent className='flex flex-wrap gap-2'>
						<div className='w-full flex flex-wrap gap-2 justify-between item-end'>
							<h3 className='text-sm font-normal text-muted-foreground'>
								Apply Before
							</h3>
							<p className='text-sm font-medium '>
								{new Date(
									job.createdAt.getTime() +
										job.listingDuration * 24 * 60 * 60 * 1000
								).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className='w-full flex flex-wrap gap-2 justify-between item-end'>
							<h3 className='text-sm font-normal text-muted-foreground'>
								Posted On
							</h3>
							<p className='text-sm font-medium '>
								{new Date(job.createdAt.getTime()).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</p>
						</div>
						<div className='w-full flex flex-wrap gap-2 justify-between item-end'>
							<h3 className='text-sm font-normal text-muted-foreground'>
								Employment Time
							</h3>
							<p className='text-sm font-medium capitalize'>
								{job.employmentType.replaceAll('-', ' ')}
							</p>
						</div>
						<div className='w-full flex flex-wrap gap-2 justify-between item-end'>
							<h3 className='text-sm font-normal text-muted-foreground'>
								Job Location
							</h3>
							<p className='text-sm font-medium '>{job.location}</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className='flex flex-col gap-2'>
							<h2 className='text-xlfont-medium'>Comapny Information</h2>
							<div className='flex flex-wrap gap-2 items-center'>
								<Image
									src={job.Company.logo}
									width={40}
									height={40}
									alt={job.Company.name}
									objectFit='contain'
									className='size-12'
								/>
								<h3 className='text-lg text-semibold'>{job.Company.name}</h3>
							</div>
						</div>
					</CardHeader>
					<CardContent className='flex flex-wrap gap-4'>
						<h4 className='text-muted-foreground text-sm'>
							{job.Company.about}
						</h4>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
