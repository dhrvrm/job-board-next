import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button, buttonVariants } from '../ui/button';
import { auth, signOut } from '@/lib/auth';

const NavBar = async () => {
	const session = await auth();
	return (
		<div className='flex justify-between items-center'>
			<div className='logo'>
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Direc Hire Logo'
						height={50}
						width={200}
						className='cursor-pointer object-contain size-20'
					/>
				</Link>
			</div>
			<div className='nav-menu flex space-x-4 justify-center items-center'>
				<ThemeToggle />

				{session?.user ? (
					<form
						action={async () => {
							'use server';
							await signOut({ redirectTo: '/' });
						}}
					>
						<Button type='submit'>Logout</Button>
					</form>
				) : (
					<Link
						href='/login'
						className={buttonVariants({ variant: 'default' })}
					>
						Get Started
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavBar;
