import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BriefcaseBusiness, Check, MoveLeft } from 'lucide-react';
import Link from 'next/link';

export default function PayementSuccessPage() {
	return (
		<div className='w-full min-h-screen flex justify-center items-center'>
			<Card className='max-w-80'>
				<div className='p-6'>
					<div className='w-full flex justify-center'>
						<Check className='size-12 p-2 bg-green-300/20 text-green-500 rounded-full' />
					</div>
					<div className='mt-3 text-center sm:mt-5 w-full'>
						<h2 className='text-xl font-semibold'>Payment Successful</h2>
						<p className='text-sm text-muted-foreground mt-1 text-balance tracking-tight'>
							Congrats, your payment was successful. Your Job Posting is now
							active!
						</p>
					</div>
					<Link
						className={cn(buttonVariants(), 'flex items-center mt-6')}
						href='/job-posts'
					>
						<MoveLeft />
						<BriefcaseBusiness size={4} />
						<span>Your Jobs</span>
					</Link>
				</div>
			</Card>
		</div>
	);
}
