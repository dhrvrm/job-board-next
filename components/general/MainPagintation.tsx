'use client';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const MainPagintation = ({
	totalPages,
	currentPage,
}: {
	totalPages: number;
	currentPage: number;
}) => {
	const searchParams = useSearchParams();
	const router = useRouter();
	function handlePageChange(page: number) {
		const params = new URLSearchParams(searchParams.toString());
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	}
	function generatePaginationItems() {
		const items = [];
		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				items.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 3; i++) {
					items.push(i);
				}
				items.push(null);
				items.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				items.push(1);
				items.push(null);
				for (let i = totalPages - 2; i <= totalPages; i++) {
					items.push(i);
				}
			} else {
				items.push(1);
				items.push(null);

				items.push(currentPage - 1);
				items.push(currentPage);
				items.push(currentPage + 1);

				items.push(null);
				items.push(totalPages);
			}
		}

		return items;
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={(e) => {
							e.preventDefault();
							if (currentPage > 1) handlePageChange(currentPage - 1);
						}}
						className={cn(
							currentPage === 1
								? 'pointer-events-none cursor-not-allowed opacity-50'
								: 'cursor-pointer'
						)}
					/>
				</PaginationItem>
				{generatePaginationItems()?.map((page, idx) => {
					if (page === null) {
						return (
							<PaginationItem key={idx}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					} else {
						return (
							<PaginationItem key={idx} className='cursor-pointer'>
								<PaginationLink
									onClick={(e) => {
										e.preventDefault();
										handlePageChange(page);
									}}
									isActive={currentPage === page}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
					}
				})}

				<PaginationItem className='cursor-pointer'>
					<PaginationNext
						href='#'
						onClick={(e) => {
							e.preventDefault();
							if (currentPage < totalPages) handlePageChange(currentPage + 1);
						}}
						className={
							currentPage == totalPages ? 'pointer-events-none opacity-50' : ''
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default MainPagintation;
