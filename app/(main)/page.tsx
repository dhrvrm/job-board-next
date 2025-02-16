import JobsFilter from '@/components/general/JobsFilter';
import JobsListing from '@/components/general/JobsListing';
import JobListsLoading from '@/components/loading/JobListsLoading';
import { Suspense } from 'react';

type Params = {
	searchParams: Promise<{
		page?: string;
		jobTypes?: string;
		location?: string;
	}>;
};
export default async function Home({ searchParams }: Params) {
	const params = await searchParams;

	const currentPage = Number(params.page) || 1;
	const jobTypes = params.jobTypes?.split(',') || [];
	const locationSelected = params.location || '';

	const filterKey = `page=${currentPage};location=${locationSelected};jobTypes=${jobTypes.join(
		','
	)}`;
	return (
		<main className='grid lg:grid-cols-3 gap-8 p-2 md:p-0 my-8'>
			<JobsFilter />

			<Suspense fallback={<JobListsLoading />} key={filterKey}>
				<JobsListing
					currentPage={currentPage}
					jobTypes={jobTypes}
					location={locationSelected}
				/>
			</Suspense>
		</main>
	);
}
