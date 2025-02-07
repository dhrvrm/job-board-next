import OnboardingForm from '@/components/forms/onboarding/OnboardingForm';
import { requireAuth } from '../hooks/server/requireAuth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

async function checkIfUserOnboardingHasCompleted(
	userId: string
): Promise<boolean | undefined> {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			onBoardingCompleted: true,
		},
	});

	return user?.onBoardingCompleted;
}

export default async function OnboardingPage() {
	const user = await requireAuth();

	const notAllowed = await checkIfUserOnboardingHasCompleted(
		user?.id as string
	);
	if (notAllowed) {
		redirect('/');
	}

	return (
		<div className='min-h-screen w-full flex flex-col items-center justify-center py-10'>
			<OnboardingForm />
		</div>
	);
}
