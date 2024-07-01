'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import organizations from '@/conf/data';
import { Badge } from './ui/badge';
import { useQuery } from '@apollo/client';
import { LIST_ALL_ORGS_QUERY } from '@/graphql/queries';
import SkeletonGrid from './ui/SkeletionGrid';
import Link from 'next/link';
import ErrorDisplay from './ui/ErrorDisplay';

export function SearchBar() {
	return (
    <div className="flex items-center space-x-2 bg-secondary px-4 border-2 border-slate-200 rounded-full w-full max-w-xl">
      <Search className="w-6 h-6" />
      <Input
        className="border-0 text-md ring-0 focus-visible:ring-0 focus:ring-0 focus-visible:border-0 bg-secondary w-full focus-visible:ring-offset-0"
        type="text"
        placeholder="Search Orgs..."
      />
    </div>
  );
}

export function OrgListingCard({ org }: any) {
	return (
		<Link href={`/orgs/org-overview/${org._id}`}>
			<Card className='border-2 border-primary/20 hover:bg-secondary mt-2 min-w-[350px] max-w-[400px] transition-colors duration-300 cursor-pointer'>
				<CardHeader className='p-2'>
					<div className='flex sm:flex-row flex-col justify-between items-end sm:items-center'>
						<div className='flex items-center gap-4 w-full'>
							<Image
								className='rounded w-20 h-20 object-cover'
								src='/logo-3.png'
								alt='Organization Logo'
								width={50}
								height={50}
							/>
							<div className='space-y-1'>
								<CardTitle className='text-lg text-slate-700'>
									{org.name}
								</CardTitle>
								<CardDescription className='max-w-[250px] text-ellipsis text-wrap overflow-hidden'>
									{org.description}
								</CardDescription>
								<Badge className='border-primary bg-secondary border text-center text-primary hover:text-white shrink-0'>
									{org.location || 'Location'}
								</Badge>
							</div>
						</div>
					</div>
				</CardHeader>
			</Card>
		</Link>
	);
}

const OrgList = () => {
	const { loading, error, data } = useQuery(LIST_ALL_ORGS_QUERY);
	if (loading) return <SkeletonGrid />;
	if (error) return <ErrorDisplay errorMessage={error.message}/>
	return (
		<div className='flex justify-center w-full'>
			<div className='flex flex-col items-center space-y-3 p-4'>
				<h1 className='text-3xl text-primary'>Top Organizations</h1>
				<p>
					Find hundreds of web3 Orgs, see their roadmap and explore
					open tasks and work
				</p>
				<SearchBar />
				<div className='gap-4 grid grid-cols-3 w-full'>
					{data?.listAllOrgs.map(org => (
						<OrgListingCard key={org._id} org={org} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OrgList;
