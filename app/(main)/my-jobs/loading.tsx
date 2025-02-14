import { Skeleton } from '@/components/ui/skeleton';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const LoadingMyJobs = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>My Jobs</CardTitle>
				<CardDescription>
					Manage your job listings and applications here.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Job Title</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Plan</TableHead>
							<TableHead>Duration</TableHead>

							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{[...Array(10)].map((_, index) => (
							<TableRow key={index}>
								<TableCell>
									<Skeleton className='h-8 w-[140px]' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-[100px]' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-[180px]' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-[40px]' />
								</TableCell>
								<TableCell>
									<Skeleton className='h-8 w-[40px]' />
								</TableCell>
								<TableCell className='text-right'>
									<Skeleton className='h-8 w-10 rounded-md ml-auto' />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default LoadingMyJobs;
