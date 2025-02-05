import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/button';

const NavBar = () => {
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
				<Button variant='default' asChild>
					<Link href='/login'>Get Started</Link>
				</Button>
			</div>
		</div>
	);
};

export default NavBar;
