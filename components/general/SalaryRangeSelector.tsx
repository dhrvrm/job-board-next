'use client';
import { Control, useController } from 'react-hook-form';
import { Slider } from '@/components/ui/slider';
import { useEffect, useState } from 'react';
import { getFormatedCurrency } from '@/utils/formatCurrency';

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	control: Control<any>;
	step: number;
	minSalary: number;
	maxSalary: number;
	currency: string;
};

const SalaryRangeSelector = ({
	step,
	currency,
	minSalary,
	maxSalary,
	control,
}: Props) => {
	const { field: fromField } = useController({
		name: 'salaryFrom',
		control,
	});
	const { field: toField } = useController({
		name: 'salaryTo',
		control,
	});

	const [range, setRange] = useState<[number, number]>([
		fromField.value || minSalary,
		toField.value || maxSalary / 2,
	]);

	function handleSliderChange(value: number[]) {
		setRange([value[0], value[1]]);
		fromField.onChange(value[0]);
		toField.onChange(value[1]);
	}

	// Update range when form values change externally
	useEffect(() => {
		setRange([fromField.value || minSalary, toField.value || maxSalary / 2]);
	}, [fromField.value, toField.value, minSalary, maxSalary]);

	return (
		<div className='w-full space-y-4'>
			<Slider
				onValueChange={handleSliderChange}
				min={minSalary}
				max={maxSalary}
				step={step}
				value={range}
				className='py-4'
			/>
			<div className='flex justify-between'>
				<div className='text-xs font-normal'>
					{getFormatedCurrency(range[0], currency)}
					{'/yr'}
				</div>
				<div className='text-xs font-normal'>
					{getFormatedCurrency(range[1], currency)}
					{'/yr'}
				</div>
			</div>
		</div>
	);
};

export default SalaryRangeSelector;
