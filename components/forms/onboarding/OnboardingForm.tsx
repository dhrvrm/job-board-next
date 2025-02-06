'use client';
import { useState } from 'react';
import UserSelectionForm from './UserSelectionForm';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import CompanyOnboaringForm from './CompanyOnboaringForm';
import JobSeekerOnboaringForm from './JobSeekerOnboaringForm';

type UserSelectionType = 'company' | 'jobseeker' | null;

const OnboardingForm = () => {
	const [step, setStep] = useState(1);
	const [userType, setUserType] = useState<UserSelectionType>(null);

	function handleUserSelection(userType: UserSelectionType) {
		setUserType(userType);
		setStep(2);
	}

	function renderStep() {
		switch (step) {
			case 1:
				return <UserSelectionForm selectType={handleUserSelection} />;
			case 2:
				return userType === 'company' ? (
					<CompanyOnboaringForm />
				) : (
					<JobSeekerOnboaringForm />
				);
			default:
				return <p>Something went wrong</p>;
		}
	}

	return (
		<>
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
			<Card className='max-w-lg w-full'>
				<CardContent className='p-6'>{renderStep()}</CardContent>
			</Card>
		</>
	);
};

export default OnboardingForm;
