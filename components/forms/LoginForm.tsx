import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import Google from '../icons/google-icon';
import Github from '../icons/github-icon';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn } from '@/lib/auth';
import SubmitButton from '../general/SubmitButton';
import { redirect } from 'next/navigation';

export async function LoginForm() {
	const session = await auth();

	if (session?.user) {
		redirect('/');
	}

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
							<form
								action={async () => {
									'use server';
									await signIn('google', {
										redirectTo: '/',
									});
								}}
							>
								<SubmitButton
									text='Login with Google'
									icon={<Google />}
									variant='outline'
									className='w-full'
								/>
							</form>
							<form
								action={async () => {
									'use server';
									await signIn('github', {
										redirectTo: '/',
									});
								}}
							>
								<SubmitButton
									text='Login with GitHub'
									icon={<Github />}
									variant='outline'
									className='w-full'
								/>
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
