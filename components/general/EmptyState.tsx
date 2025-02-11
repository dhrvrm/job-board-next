import { Ban } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
type Props = {
	heading: string;
	description: string;
	buttonText: string;
	href: string;
};
const EmptyState = ({ heading, description, buttonText, href }: Props) => {
	return (
		<div className='text-center col-span-2 flex flex-col flex-1 h-full justify-center items-center rounded-md border border-dashed p-8'>
			<div className='rounded-full bg-primary/10 p-4 flex justify-center items-center'>
				<Ban className='size-10 text-primary' />
			</div>
			<span className='text-xl font-semibold mt-4'>{heading}</span>
			<span className='text-sm text-muted-foreground mt-1 text-balance tracking-tight max-w-sm mb-8'>
				{description}
			</span>
			<Link href={href} className={buttonVariants()}>
				<MoveLeft />
				{buttonText}
			</Link>
		</div>
	);
};

export default EmptyState;
