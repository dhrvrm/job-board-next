import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { buttonVariants } from '../ui/button';
import { auth } from '@/lib/auth';
import { UserDropdown } from './UserDropdown';

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
			<div className='hidden md:flex nav-menu gap-4 justify-center items-center'>
				<ThemeToggle />
				<Link
					href='/post-job'
					className={buttonVariants({ variant: 'default' })}
				>
					Post Job
				</Link>

				{session?.user ? (
					<UserDropdown
						name={session.user?.name as string}
						image={session.user?.image as string}
						email={session.user?.email as string}
					/>
				) : (
					<Link
						href='/login'
						className={buttonVariants({ variant: 'secondary' })}
					>
						Get Started
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavBar;
