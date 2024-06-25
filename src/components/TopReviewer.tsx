import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle
} from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import Image from 'next/image';
import organizations from '@/conf/data';
import { Badge } from './ui/badge';
interface ContributorData {
	rank: number;
	name: string;
	taskDone: number;
	Points: number;
	Earned: string;
}

interface TopContributorProps {
	data: ContributorData[];
}

export function SearchBar() {
	return (
		<div className='flex items-center space-x-2 border-primary px-4 border rounded'>
			<Search className='text-primary' />
			<Input
				className='border-0 ring-0 focus-visible:ring-0 focus:ring-0 focus-visible:border-0 w-full focus-visible:ring-offset-0'
				type='text'
				placeholder='Search Reviewers...'
			/>
		</div>
	);
}

const COLUMNS = [
	{
		Header: 'Rank',
		accessor: 'rank',
		Cell: (row: { cell: { value: any } }) => {
			return <span>{row?.cell?.value}</span>;
		}
	},
	{
		Header: 'UserName',
		accessor: 'name',
		Cell: (row: { cell: { value: any } }) => {
			return <span>{row?.cell?.value}</span>;
		}
	},
	{
		Header: 'Tasks Done',
		accessor: 'taskDone',
		Cell: (row: { cell: { value: any } }) => {
			return <span>{row?.cell?.value}</span>;
		}
	},
	{
		Header: 'Task Points',
		accessor: 'Points',
		Cell: (row: { cell: { value: any } }) => {
			return <span>{row?.cell?.value}</span>;
		}
	},
	{
		Header: 'Earned',
		accessor: 'Earned',
		Cell: (row: { cell: { value: any } }) => {
			return <span className='lowercase'>{row?.cell?.value}</span>;
		}
	}
];

const TopContributor: React.FC<TopContributorProps> = ({ data }) => {
	const columns = React.useMemo(() => COLUMNS, []);
	const dataMemo = React.useMemo(() => data, []);

	return (
		<>
			<div className='p-6 w-full'>
				<div className='flex justify-center items-center gap-6 px-3 py-2'>
					<p>Top Reviewer</p>
					<Badge className='flex justify-center items-center bg-primary border rounded-lg w-24 h-8 text-center text-primary-foreground shrink-0'>
						All time
					</Badge>
					<SearchBar />
				</div>
				<Card x-chunk='dashboard-06-chunk-0' className='mt-4'>
					<div
						className='table-container'
						style={{ maxHeight: '600px', overflowY: 'auto' }}>
						<Table className='bg-secondary shadow-lg border rounded-lg w-full overflow-hidden'>
							<TableHeader className='bg-secondary border'>
								<TableRow>
									<TableHead className='hidden sm:table-cell'>
										Rank
									</TableHead>
									<TableHead>Username</TableHead>
									<TableHead className='hidden md:table-cell'>
										Task Reviewed
									</TableHead>
									<TableHead className='hidden md:table-cell'>
										Task Points
									</TableHead>
									<TableHead className='hidden md:table-cell'>
										Earned
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{data.map((product, index) => (
									<TableRow
										key={product.rank}
										className={
											index % 2 === 0 ? 'bg-white' : 'bg-white'
										}>
										<TableCell className='hidden sm:table-cell'>
											{product.rank}
										</TableCell>
										<TableCell className='flex items-center gap-2 font-medium'>
											<Image
												alt='Product image'
												className='border rounded-full aspect-square object-cover'
												height='36'
												src='/av-7.png'
												width='36'
											/>
											{product.name}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{product.taskDone}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{product.Points}
										</TableCell>
										<TableCell className='hidden md:table-cell'>
											{product.Earned}
										</TableCell>
										<TableCell></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<CardFooter>
						<div className='text-muted-foreground text-xs'>
							Showing <strong>1-10</strong> of <strong>32</strong>{' '}
							Reviewers
						</div>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default TopContributor;
