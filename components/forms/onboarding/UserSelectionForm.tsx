import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

type UserSelectionType = 'company' | 'jobseeker';
type Props = {
	selectType: (userType: UserSelectionType) => void;
};
const UserSelectionForm = ({ selectType }: Props) => {
	return (
		<div className='space-y-8'>
			<div className='text-center space-y-2'>
				<h2 className='text-2xl bold font-medium'>Welcome! Almost done</h2>
				<p className='text-muted-foreground'>
					Are you looking for a job or looking to hire?
				</p>
			</div>

			<div className='flex flex-col space-y-4'>
				<Button
					variant={'outline'}
					className='flex w-full h-auto p-6 justify-start gap-4 border-2 transition-all duration-200 ease-in-out hover:border-primary hover:bg-primary/5'
					onClick={() => selectType('jobseeker')}
				>
					<div className='rounded-full size-12 bg-primary/10 flex items-center justify-center'>
						<Building2 className='size-6 text-primary' />
					</div>
					<div className='flex flex-col justify-start items-start'>
						<h3 className='text-lg font-semibold'>Job Seeker</h3>
						<p className='font-normal'>Find your dream opportunity.</p>
					</div>
				</Button>
				<Button
					variant={'outline'}
					className='flex w-full h-auto p-6 justify-start gap-4 border-2 transition-all duration-200 ease-in-out hover:border-primary hover:bg-primary/5'
					onClick={() => selectType('company')}
				>
					<div className='rounded-full size-12 bg-primary/10 flex items-center justify-center'>
						<Building2 className='size-6 text-primary' />
					</div>
					<div className='flex flex-col justify-start items-start'>
						<h3 className='text-lg font-semibold'>Company/ Organization</h3>
						<p className='font-normal'>Post jobs and find rigth talent.</p>
					</div>
				</Button>
			</div>
		</div>
	);
};

export default UserSelectionForm;
