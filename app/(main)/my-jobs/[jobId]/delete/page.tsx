import { deleteJobPost } from '@/app/actions';
import { requireAuth } from '@/app/hooks/server/requireAuth';
import SubmitButton from '@/components/general/SubmitButton';
import { buttonVariants } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { MoveLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';

type Params = Promise<{ jobId: string }>;
export default async function DeleteJobPage({ params }: { params: Params }) {
	await requireAuth();
	const { jobId } = await params;

	return (
		<div className='mt-24 flex justify-center items-center'>
			<Card>
				<CardHeader>
					<CardTitle className='text-2xl font-semibold'>
						Are you sure you want to delete?{' '}
						<span className='text-red-400 font-medium text-lg'>
							(Permananent Action)
						</span>
					</CardTitle>
					<CardDescription>
						You cannot undo this, the payment is non refunable, if you want to
						change something you can edit the Job Post.
					</CardDescription>
				</CardHeader>
				<CardFooter className='flex flex-wrap gap-4'>
					<Link
						className={buttonVariants({ variant: 'secondary' })}
						href='/my-jobs'
					>
						<MoveLeft /> Go Back
					</Link>
					<form
						action={async () => {
							'use server';
							await deleteJobPost(jobId);
						}}
					>
						<SubmitButton
							variant={'destructive'}
							text='Delete Job'
							icon={<Trash2 />}
						/>
					</form>
				</CardFooter>
			</Card>
		</div>
	);
}
