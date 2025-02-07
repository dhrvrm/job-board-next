import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const requireAuth = async () => {
	const session = await auth();

	if (!session?.user?.id) {
		redirect('/');
	}
	return session?.user;
};
