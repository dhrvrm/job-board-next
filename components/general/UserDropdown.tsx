import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { signOut } from '@/lib/auth';
import { Heart, Layers2, LogOut } from 'lucide-react';
import Link from 'next/link';

type Props = {
	name: string;
	image: string;
	email: string;
};

export function UserDropdown({ name, image, email }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='border-2 border-muted'>
					<AvatarImage src={image} alt='profile image' />
					<AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel className='flex flex-col'>
					<span className='text-sm font-medium text-foreground'>{name}</span>
					<span className='text-xs font-medium text-muted-foreground'>
						{email}
					</span>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Link href='/favorites' className='flex gap-2 items-center'>
							<Heart size={16} strokeWidth={2} className='opacity-60' />
							<span>Favorite Jobs</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href='/my-jobs' className='flex gap-2 items-center'>
							<Layers2 size={16} strokeWidth={2} className='opacity-60' />
							<span>My Job Lisitings</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<form
							action={async () => {
								'use server';
								await signOut({
									redirectTo: '/',
								});
							}}
							className='flex gap-2 items-center'
						>
							<LogOut size={16} strokeWidth={2} className='opacity-60' />{' '}
							<span>Logout</span>
						</form>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
