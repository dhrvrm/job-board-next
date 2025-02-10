import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import AzureLogo from '@/public/logos/azure.png';
import AdobeLogo from '@/public/logos/adobe.png';
import BlueSkyLogo from '@/public/logos/blue-sky.png';
import MircosoftLogo from '@/public/logos/microsoft.png';
import MotionLogo from '@/public/logos/motion.png';
import VercelLogo from '@/public/logos/vercel.png';
import Image from 'next/image';
import PostJobForm from '@/components/forms/PostJobForm';
import { requireAuth } from '@/app/hooks/server/requireAuth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

const companiesList = [
	{
		id: 1,
		name: 'Azure',
		logo: AzureLogo,
	},
	{
		id: 2,
		name: 'Microsoft',
		logo: MircosoftLogo,
	},
	{
		id: 3,
		name: 'Adobe',
		logo: AdobeLogo,
	},
	{
		id: 4,
		name: 'Blue Sky',
		logo: BlueSkyLogo,
	},
	{
		id: 5,
		name: 'Motion',
		logo: MotionLogo,
	},
	{
		id: 6,
		name: 'Vercel',
		logo: VercelLogo,
	},
];

const testimonials = [
	{
		quote:
			'We found our ideal candidate within 48 hours of posting. The quality of applicants was exceptional!',
		author: 'Sarah Chen',
		company: 'TechCorp',
	},
	{
		quote:
			'The platform made hiring remote talent incredibly simple. Highly recommended!',
		author: 'Mark Johnson',
		company: 'StartupX',
	},
	{
		quote:
			"We've consistently found high-quality candidates here. It's our go-to platform for all our hiring needs.",
		author: 'Emily Rodriguez',
		company: 'InnovateNow',
	},
];

const stats = [
	{ value: '10k+', label: 'Monthly active job seekers' },
	{ value: '48h', label: 'Average time to hire' },
	{ value: '95%', label: 'Employer satisfaction rate' },
	{ value: '500+', label: 'Companies hiring monthly' },
];

async function getCompany(userId: string) {
	try {
		const data = await prisma.company.findUnique({
			where: { userId: userId },
			select: {
				id: true,
				name: true,
				location: true,
				about: true,
				logo: true,
				xAccount: true,
				website: true,
			},
		});

		if (!data) {
			return redirect('/');
		}
		return data;
	} catch (err) {
		console.error('Company is not there for the user or database error', err);
	}
}

export default async function PostJobPage() {
	const user = await requireAuth();

	const data = await getCompany(user.id as string);

	if (!user.id) {
		redirect('/');
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5'>
			<Card className='col-span-1 lg:col-span-2'>
				<CardHeader>
					<CardTitle>
						<PostJobForm
							companyAbout={data?.about as string}
							companyLocation={data?.location as string}
							companyLogo={data?.logo as string}
							companyName={data?.name as string}
							companyWebsite={data?.website as string}
						/>
					</CardTitle>
				</CardHeader>
			</Card>

			<Card className='col-span-1 h-fit sticky top-5'>
				<CardHeader>
					<CardTitle className='text-xl'>Trusted by Industry Leaders</CardTitle>
					<CardDescription>
						Join the thousand of companies hiring talent
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Company logos */}
					<div className='grid grid-cols-3 gap-4'>
						{companiesList?.map((company) => (
							<div key={company.id}>
								<Image
									src={company.logo}
									alt={company.name}
									className='rounded-sm opacity-80 hover:opacity-100 transition-all duration-300'
								/>
							</div>
						))}
					</div>
					{/* Testimonials */}
					<div className='space-y-4 mt-6'>
						{testimonials.map((item, idx) => (
							<blockquote key={idx} className='border-primary border-l-2 pl-2'>
								<p className='text-foreground italic'>
									&quot;{item.quote}&quot;
								</p>
								<footer className='text-sm text-muted-foreground'>
									~{item.author}, {item.company}
								</footer>
							</blockquote>
						))}
					</div>
					{/* Stats */}

					<div className='grid grid-cols-2 gap-4 mt-6'>
						{stats.map((stat, idx) => (
							<div
								key={idx}
								className='bg-muted rounded-lg p-4 border-b-2 border-primary'
							>
								<h4 className='text-2xl font-bold mb-1'>{stat.value}</h4>
								<p className='text-sm text-muted-foreground'>{stat.label}</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
