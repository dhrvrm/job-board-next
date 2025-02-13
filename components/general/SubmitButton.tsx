'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Heart, Loader, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type SubmitButtonProps = {
	text: string;
	className?: string;
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
		| null
		| undefined;
	icon?: React.ReactNode;
};
const SubmitButton = ({
	text,
	className,
	variant,
	icon,
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button className={className} variant={variant} disabled={pending}>
			{pending ? (
				<>
					<LoaderCircle className='animate-spin' />
					<span> Hold on</span>
				</>
			) : (
				<>
					{icon && <div>{icon}</div>}
					<span>{text}</span>
				</>
			)}
		</Button>
	);
};
export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
	const { pending } = useFormStatus();

	return (
		<Button
			variant={'outline'}
			disabled={pending}
			type='submit'
			className='flex w-fit gap-2 items-center'
		>
			{pending ? (
				<>
					<Loader className='animate-spin size-4' />
					<span>Hold On</span>
				</>
			) : (
				<>
					<Heart
						className={cn(
							'size-4 transition-colors',
							savedJob ? 'fill-current text-red-500' : ''
						)}
					/>
					<span>Save Post</span>
				</>
			)}
		</Button>
	);
}

export default SubmitButton;
