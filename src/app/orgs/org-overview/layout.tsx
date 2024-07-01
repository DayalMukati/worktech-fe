'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
	FolderKanban,
	Home,
	LineChart,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetContent,
	SheetTrigger
} from '@/components/ui/sheet';

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { useParams, usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import DashboardSidebar from '@/components/dashboard-sidebar';
import OrgSidebar from '@/components/org-sidebar';

const OrgOverviewLayout = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const currentURI = usePathname();
	const isPathMatch = (
		currentPath: string,
		menuItemHref: string
	): boolean => {
		return currentPath === menuItemHref;
	};

	const Icons: { [key: string]: JSX.Element } = {
		Home: <Home className='w-5 h-5' />,
		FolderKanban: <FolderKanban className='w-5 h-5' />
	};
	const menuItems = [
		{
			href: '/dashboard',
			icon: 'layout-dashboard',
			label: 'Orgs'
		},
		{
			href: '/dashboard/projects',
			icon: 'FolderKanban',
			label: 'Projects'
		}
	];
	const params = useParams<{ orgId: string }>();
	return (
		<div className='flex flex-col bg-muted/40 w-full h-screen'>
			<main className='grid grid-cols-4 lg:grid-cols-6 sm:py-0 sm:pl-20 h-full overflow-y-hidden'>
				<OrgSidebar
					Title='Ten (Formaly known as Org) Overview)'
					orgId={params.orgId}
				/>
				<div className='col-span-3 lg:col-span-5 mt-2 h-full overflow-auto'>
					<Header />
					{children}
				</div>
			</main>
		</div>
	);
};

export default OrgOverviewLayout;
