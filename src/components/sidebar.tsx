import { FolderKanban, Home, Package2, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from './ui/tooltip';
import { usePathname } from 'next/navigation';
import { checkPathMatch, cn } from '@/lib/utils';
import { Button } from './ui/button';

const Sidebar = () => {
	const currentURI = usePathname();

	const Icons: { [key: string]: JSX.Element } = {
		Home: <Home className='w-5 h-5' />,
		FolderKanban: <FolderKanban className='w-5 h-5' />
	};
	const menuItems = [
		{
			href: '/dashboard',
			icon: 'Home',
			label: 'Orgs'
		}
	];
	return (
		<aside className='left-0 z-10 fixed inset-y-0 sm:flex flex-col hidden bg-background border-r w-20'>
			<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
				{menuItems.map(({ href, icon, label }) => (
					<Tooltip key={href}>
						<TooltipTrigger asChild>
							<Link
								href={href}
								className={cn(
									'flex justify-center items-center  rounded-lg w-10 h-10 hover:text-foreground transition-colors',
									'text-accent-foreground bg-accent',
									checkPathMatch(currentURI, href)
										? 'text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary'
										: 'text-muted-foreground rounded-full'
								)}>
								{Icons[icon]}
								<span className='sr-only'>{label}</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>{label}</TooltipContent>
					</Tooltip>
				))}
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant='outline' size={'icon'}>
							<Plus className='w-5 h-5' />
							<span className='sr-only'>{'Create Org'}</span>
						</Button>
					</TooltipTrigger>
					<TooltipContent side='right'>{'Create Org'}</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	);
};

export default Sidebar;
