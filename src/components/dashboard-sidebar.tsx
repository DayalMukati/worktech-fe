import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
	const currentURI = usePathname();
	const isPathMatch = (
		currentPath: string,
		menuItemHref: string
	): boolean => {
		return currentPath === menuItemHref;
	};
	const menuItems = [
		{
			href: '/dashboard',
			icon: 'Home',
			label: 'Explore'
		},
		{
			href: '/dashboard/tasks',
			icon: 'FolderKanban',
			label: 'Tasks'
		}
	];
	return (
		<aside className='col-span-1 bg-background border-r'>
			<div className='p-3.5 border-b-2'>
				<h2 className='text-xl'>Dashboard</h2>
			</div>
			<nav className='p-4'>
				<ul className='space-y-2'>
					{menuItems.map(({ href, icon, label }) => (
						<li>
							<Button
								className={cn(
									'flex justify-start bg-transparent hover:bg-primary/10 w-full text-foreground transition-colors',
									isPathMatch(currentURI, href)
										? 'text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary'
										: ''
								)}
								asChild>
								<Link href={href}>{label}</Link>
							</Button>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};

export default DashboardSidebar;
