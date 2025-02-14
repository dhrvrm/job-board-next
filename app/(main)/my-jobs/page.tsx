import { requireAuth } from '@/app/hooks/server/requireAuth';
import CopyJobLink from '@/components/general/CopyJobLink';
import EmptyState from '@/components/general/EmptyState';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { prisma } from '@/lib/db';
import { cn } from '@/lib/utils';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import Link from 'next/link';

async function getPostedJobs(userId: string) {
	const jobs = await prisma.jobPost.findMany({
		where: {
			Company: {
				userId: userId,
			},
		},
		select: {
			id: true,
			jobTitle: true,
			employmentType: true,
			listingDuration: true,
			status: true,
			createdAt: true,
		},
		orderBy: { createdAt: 'desc' },
	});

	return jobs;
}

export default async function ManageCreatedJobsPage() {
	const user = await requireAuth();
	const jobs = await getPostedJobs(user.id as string);

	if (jobs.length === 0) {
		return (
			<EmptyState
				heading='No Jobs posted'
				description='You have not posted a job on this platform yet'
				buttonText='Post a job'
				href='/post-job'
			/>
		);
	}

	return (
		<div className='my-8'>
			<Card>
				<CardHeader>
					<CardTitle>Your Jobs</CardTitle>
					<CardDescription>
						Manage your job listing applications from here.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Job Title</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created At</TableHead>
								<TableHead>Plan Duration</TableHead>
								<TableHead className='text-right'>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{jobs.map((job) => (
								<TableRow key={job.id}>
									<TableCell>{job.jobTitle}</TableCell>
									<TableCell
										className={cn(
											'capitalize',
											job.status === 'ACTIVE'
												? 'bg-green-600 text-white'
												: job.status === 'EXPIRED'
												? 'bg-orange-600 text-white'
												: 'bg-slate-600 text-white'
										)}
									>
										{job.status.toLowerCase()}
									</TableCell>
									<TableCell>
										{job.createdAt.toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric',
											year: 'numeric',
										})}
									</TableCell>
									<TableCell>{job.listingDuration}</TableCell>
									<TableCell className='text-right'>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant={'ghost'}>
													<MoreHorizontal className='size-4' />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align='end'>
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem asChild>
													<Link href={`/my-jobs/${job.id}/edit`}>
														<Edit /> Edit
													</Link>
												</DropdownMenuItem>

												<CopyJobLink
													jobURL={`${process.env.NEXT_PUBLIC_URL}/job/${job.id}`}
												/>
												<DropdownMenuSeparator />

												<DropdownMenuItem asChild>
													<Link href={`/my-jobs/${job.id}/delete`}>
														<Trash2 /> Delete
													</Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
