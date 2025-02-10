'use client';

import { ControllerRenderProps } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { jobListingDurationPricing } from '@/lib/priceTiers';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { cn } from '@/lib/utils';

type Props = {
	field: ControllerRenderProps;
};
const JobListingDurationSelector = ({ field }: Props) => {
	return (
		<RadioGroup
			value={field.value?.toString()}
			onValueChange={(value) => field.onChange(parseInt(value))}
		>
			{jobListingDurationPricing.map((tier) => (
				<div className='relative' key={tier.days}>
					<RadioGroupItem
						value={tier.days.toString()}
						id={tier.days.toString()}
						className='sr-only'
					/>
					<Label
						htmlFor={tier.days.toString()}
						className='flex flex-col cursor-pointer'
					>
						<Card
							className={cn(
								field.value === tier.days
									? 'border-primary bg-primary/10?'
									: 'hover:bg-primary/5',
								'p-4 border-2 transition-all'
							)}
						>
							<div className='flex justify-between items-center'>
								<div className='flex flex-col '>
									<span className='text-lg font-semibold'>
										{tier.days} Days
									</span>
									<span className='text-sm text-muted-foreground'>
										{tier.description}
									</span>
								</div>
								<div className='text-right flex flex-col'>
									<span className='text-lg font-semibold text-primary'>
										${tier.price}
									</span>
									<span className='text-sm text-muted-foreground'>
										${(tier.price / tier.days).toFixed(2)}
										<span className='text-xs'>/day</span>
									</span>
								</div>
							</div>
						</Card>
					</Label>
				</div>
			))}
		</RadioGroup>
	);
};

export default JobListingDurationSelector;
