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

// Define the type for a contributor
interface Contributor {
	name: string;
	reputation: number;
	description: string;
	avatar: string;
}

export function SearchBar(): JSX.Element {
	return (
		<div className='flex items-center space-x-2 px-4 border w-full max-w-xl bg-secondary rounded'>
			<Search className='' />
			<Input
				className='border-0 ring-0 focus-visible:ring-0 focus:ring-0 w-full focus-visible:border-0 focus-visible:ring-offset-0 bg-secondary'
				type='text'
				placeholder='Search Contributors...'
			/>
		</div>
	);
}

const contributors: Contributor[] = [
	{
		name: 'Sero | Hunters Workshop',
		reputation: 11340,
		description:
			'Software Engineer | Web3 | Podcaster Fluent in English, Arabic and French',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'ifun',
		reputation: 10097,
		description:
			'DAO Operations Contributor. Graphics, Content and Template Creator.',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'Zaff',
		reputation: 7150,
		description:
			'Community Operations & Management DAO Tooling | Content & Communication.',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'scagria',
		reputation: 3800,
		description: 'Polyglot fluent in English, German and Portuguese. I help DAOs and crypto.',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'sagitario',
		reputation: 4750,
		description:
			'Polyglot fluent in English, German and Portuguese. I help DAOs and crypto.',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'hamzat iii',
		reputation: 4209,
		description:
			'Technical and Content Writing – Content Creation – Analysis – Social Media.',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'v3dant.eth',
		reputation: 1750,
		description:
			'Indian web3 enthusiast specializing in operations, translation and IRL meetups',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'tnrd',
		reputation: 1400,
		description: 'Indian web3 enthusiast specializing in operations, translation and IRL meetups',
		avatar: 'https://placehold.co/48x48'
	},
	{
		name: 'Latsan',
		reputation: 1300,
		description: 'Indian web3 enthusiast specializing in operations, translation and IRL meetups',
		avatar: 'https://placehold.co/48x48'
	}
];

interface ContributorCardProps {
	contributor: Contributor;
}

const ContributorCard: React.FC<ContributorCardProps> = ({
	contributor
}) => {
	return (
		<Card className='hover:bg-secondary transition-colors border-2 border-primary/40 duration-300 cursor-pointer h-40'>
			<CardHeader>
				<div className='flex flex-col sm:flex-row justify-between items-end sm:items-center '>
					<div className='flex  items-center gap-4'>
						<Image
							className='w-14 h-14 border object-cover rounded-full p-1'
							src='/av-7.png'
							alt='LOGO'
							width={64}
							height={64}
						/>
						<div>
							<p className='text-xl'>{contributor.name}</p>
							<span className='flex space-x-2'>
								<p>Reputation:</p>
								<Badge className=' hover:text-white text-center bg-secondary text-primary border border-primary'>
									{contributor.reputation}
								</Badge>
							</span>
						</div>
					</div>
				</div>
				<div>
					<CardDescription className='text-slate-500 mt-2'>
						{contributor.description}
					</CardDescription>
				</div>
			</CardHeader>
		</Card>
	);
};

const ContributorList: React.FC = () => {
	return (
		<div className='w-full flex  justify-center px-24 '>
			<div className='flex flex-col items-center p-6 space-y-4'>
				<h1 className='text-4xl text-primary justify-start'>
					Top Contributors
				</h1>

				<SearchBar />
				<div className='w-full grid grid-cols-3 gap-4 '>
					{contributors.map(contributor => (
						<ContributorCard
							key={contributor.name}
							contributor={contributor}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default ContributorList;
