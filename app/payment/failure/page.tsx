import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BriefcaseBusiness, MoveLeft, XIcon } from 'lucide-react';
import Link from 'next/link';

export default function PayementFailurePage() {
	return (
		<div className='w-full min-h-screen flex justify-center items-center'>
			<Card className='max-w-80'>
				<div className='p-6'>
					<div className='w-full flex justify-center'>
						<XIcon className='size-12 p-2 bg-red-300/20 text-red-500 rounded-full' />
					</div>
					<div className='mt-3 text-center sm:mt-5 w-full'>
						<h2 className='text-xl font-semibold'>Payment Cancelled</h2>
						<p className='text-sm text-muted-foreground mt-1 text-balance tracking-tight'>
							No worries you will not be charged, please try again.
						</p>
					</div>
					<Link
						className={cn(buttonVariants(), 'flex items-center mt-6')}
						href='/post-job'
					>
						<MoveLeft />
						<BriefcaseBusiness size={4} />
						<span>Create a new job</span>
					</Link>
				</div>
			</Card>
		</div>
	);
}
