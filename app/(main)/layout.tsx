import NavBar from '@/components/general/NavBar';
import { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
	return (
		<div className='max-w-7xl mx-auto'>
			<NavBar />
			{children}
		</div>
	);
}
