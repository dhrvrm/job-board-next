'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

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

export default SubmitButton;
