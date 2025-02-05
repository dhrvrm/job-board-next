import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Google from '../icons/google-icon';
import Github from '../icons/github-icon';
import Link from 'next/link';
import Image from 'next/image';

export function LoginForm() {
	return (
		<div className='min-h-screen flex justify-center items-center'>
			<div className='flex flex-col gap-6 max-w-sm w-full text-center'>
				<div className='logo self-center'>
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
				<Card>
					<CardHeader>
						<CardTitle className='text-xl'>Welcome Back</CardTitle>
						<CardDescription>
							Login with your Google or GitHub account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							<form>
								<Button type='submit' variant='outline' className='w-full'>
									<Google className='size-4' />
									Login with Google
								</Button>
							</form>
							<form>
								<Button type='submit' variant='outline' className='w-full'>
									<Github className='size-4' />
									Login with Github
								</Button>
							</form>
						</div>
					</CardContent>
				</Card>
				<div className='text-muted-foreground text-xs text-balance'>
					By continuing you agree to our{' '}
					<Link href='/terms'>Terms of Service</Link> and{' '}
					<Link href='/privacy'>Privacy Policy</Link>
				</div>
			</div>
		</div>
	);
}
