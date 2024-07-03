'use client'
import React, { useEffect } from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { GET_LEADERBOARD_DATA } from '@/graphql/queries'; 
import { useQuery } from '@apollo/client';
import { useAppDispatch } from "@/hooks/toolKitTyped";
import { setLeaderboards } from "@/store/leaderboardSlice";
import SkeletionTable from '@/components/ui/SkeletionTable'
import ErrorDisplay from './ui/ErrorDisplay';

interface Contributor {
  username: string;
  taskCount: number;
  taskPoints: number;
  amountEarned: string | number;  // Adjusted to accept both strings and numbers
}

interface LeaderboardData {
  getLeaderboard: {
    contributionData?: Contributor[];
   };
}

export function SearchBar() {
  return (
    <div className='flex items-center space-x-2 border-primary px-4 border rounded'>
      <Search className='text-primary' />
      <Input
        className='border-0 ring-0 focus-visible:ring-0 focus:ring-0 focus-visible:border-0 w-full focus-visible:ring-offset-0'
        type='text'
        placeholder='Search Contributors...'
      />
    </div>
  );
}

const COLUMNS = [
  { Header: 'Rank', accessor: 'rank' },
  { Header: 'UserName', accessor: 'name' },
  { Header: 'Tasks Done', accessor: 'taskCount' },
  { Header: 'Task Points', accessor: 'taskPoints' },
  { Header: 'Earned', accessor: 'amountEarned' }
];

const TopContributor: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const { data, loading, error } = useQuery<LeaderboardData>(GET_LEADERBOARD_DATA);

  useEffect(() => {
    if (loading) return;
    if (error) return;
    dispatch(
      setLeaderboards({
        leaderboards: data?.getLeaderboard,
      })
    );
  }, [loading, error, data]);

  if (loading) return <SkeletionTable items={undefined} count={1}/>;
  if (error) return <ErrorDisplay errorMessage={error.message}/>;

  const allContributors = [
    ...(data?.getLeaderboard.contributionData ?? []),
  ];

  return (
    <div className='p-6 w-full'>
      <div className='flex justify-center items-center gap-6 px-3 py-2'>
        <p className='text-md'>Top Contributor</p>
        <Badge className='flex justify-center items-center bg-primary border rounded-lg w-24 h-8 text-primary-foreground'>
          All time
        </Badge>
        <SearchBar />
      </div>
      <Card className='mt-4'>
        <div className='table-container' style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <Table className='bg-secondary shadow-lg border rounded-lg w-full overflow-hidden'>
            <TableHeader className='bg-secondary'>
              <TableRow>
                {COLUMNS.map((column) => (
                  <TableHead key={column.accessor} className='hidden sm:table-cell'>
                    {column.Header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className=''>
              {allContributors.map((contributor, index) => {
                 const amountEarned = String(contributor.amountEarned);
                return (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-white'}>
                    <TableCell className='hidden sm:table-cell'>{index + 1}</TableCell>
                    <TableCell className='flex items-center gap-2 font-medium'>
                      <Image alt='Contributor image' className='rounded-full aspect-square object-cover' height='36' src='/av-5.png' width='36' />
                      {contributor.username}
                    </TableCell>
                    <TableCell className='hidden md:table-cell'>{contributor.taskCount}</TableCell>
                    <TableCell className='hidden md:table-cell'>{contributor.taskPoints}</TableCell>
                    <TableCell className='hidden md:table-cell'>{amountEarned.substring(0, 5)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <CardFooter>
          <div className='text-muted-foreground text-xs mt-2'>
            Showing <strong>  {allContributors.length < 10 ? (
                  <strong>{allContributors.length}</strong>
                ) : (
                  <strong>1-10</strong>
                )}</strong> of <strong>{allContributors.length}</strong> Contributors
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TopContributor;
