import JobsFilter from '@/components/general/JobsFilter';
import JobsListing from '@/components/general/JobsListing';
import JobListsLoading from '@/components/loading/JobListsLoading';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className='grid lg:grid-cols-3 gap-8 p-2 md:p-0'>
			<JobsFilter />

			<Suspense fallback={<JobListsLoading />}>
				<JobsListing />
			</Suspense>
		</main>
	);
}
