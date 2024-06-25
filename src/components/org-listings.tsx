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
import organizations from '@/data/data';
import { Badge } from './ui/badge';

export function SearchBar() {
	return (
		<div className='flex items-center space-x-2 px-4 border w-full max-w-xl bg-secondary rounded'>
			<Search className='' />
			<Input
				className='border-0 ring-0 focus-visible:ring-0 focus:ring-0 w-full focus-visible:border-0 focus-visible:ring-offset-0 bg-secondary'
				type='text'
				placeholder='Search Orgs...'
			/>
		</div>
	);
}

export function OrgListingCard({
	org
}: {
	org: (typeof organizations)[0];
}) {
	return (
		<Card className='hover:bg-secondary transition-colors duration-300 cursor-pointer h-40'>
			<CardHeader>
				<div className='flex flex-col sm:flex-row justify-between items-end sm:items-center '>
					<div className='flex  items-center gap-4'>
						<Image
							className='w-24 h-24 object-cover rounded'
							src='/logo-2.png'
							alt='Organization Logo'
							width={64}
							height={64}
						/>
						<div>
							<CardTitle>{org.name}</CardTitle>
							<CardDescription>{org.description}</CardDescription>
							<Badge className='text-center bg-primary/60 text-primary-foreground shrink-0 border '>
								{org.location}
							</Badge>
						</div>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}

const OrgList = () => {
	return (
		<div className='w-full flex  justify-center '>
			<div className='flex flex-col items-center p-4 space-y-4'>
				<h1 className='text-4xl text-primary'>Top Organizations</h1>
				<p>Find top organizations</p>
				<SearchBar />
				<div className='w-full grid grid-cols-3 gap-4'>
					{organizations.map(org => (
						<OrgListingCard key={org.id} org={org} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OrgList;
