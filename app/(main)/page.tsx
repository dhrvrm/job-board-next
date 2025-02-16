import JobsFilter from '@/components/general/JobsFilter';
import JobsListing from '@/components/general/JobsListing';
import JobListsLoading from '@/components/loading/JobListsLoading';
import { Suspense } from 'react';

type Params = {
	searchParams: Promise<{ page: string }>;
};
export default async function Home({ searchParams }: Params) {
	const params = await searchParams;

	const currentPage = Number(params.page) || 1;
	return (
		<main className='grid lg:grid-cols-3 gap-8 p-2 md:p-0 my-8'>
			<JobsFilter />

			<Suspense fallback={<JobListsLoading />} key={currentPage}>
				<JobsListing currentPage={currentPage}/>
			</Suspense>
		</main>
	);
}
