'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
	File,
	FolderKanban,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import {
	Sheet,
	SheetContent,
	SheetTrigger
} from '@/components/ui/sheet';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { usePathname } from 'next/navigation';

const layout = ({ children }: { children: React.ReactNode }) => {
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
			icon: 'Home',
			label: 'Orgs'
		},
		{
			href: '/dashboard/projects',
			icon: 'FolderKanban',
			label: 'Projects'
		}
	];
	return (
		<div className='flex flex-col bg-muted/40 w-full min-h-screen'>
			<aside className='left-0 z-10 fixed inset-y-0 sm:flex flex-col hidden bg-background border-r w-14'>
				<nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
					<Link
						href='#'
						className='flex justify-center items-center gap-2 bg-primary rounded-full w-9 md:w-8 h-9 md:h-8 font-semibold text-lg text-primary-foreground md:text-base group shrink-0'>
						<Package2 className='group-hover:scale-110 w-4 h-4 transition-all' />
						<span className='sr-only'>Acme Inc</span>
					</Link>
					{menuItems.map(({ href, icon, label }) => (
						<Tooltip key={href}>
							<TooltipTrigger asChild>
								<Link
									href={href}
									className={cn(
										'flex justify-center items-center  rounded-lg w-9 md:w-8 h-9 md:h-8 hover:text-foreground transition-colors',
										'text-accent-foreground bg-accent',
										isPathMatch(currentURI, href)
											? 'text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary'
											: 'text-muted-foreground'
									)}>
									{Icons[icon]}
									<span className='sr-only'>{label}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side='right'>{label}</TooltipContent>
						</Tooltip>
					))}
				</nav>
			</aside>

			<div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
				<header className='top-0 z-30 sm:static sticky flex items-center gap-4 sm:border-0 bg-background sm:bg-transparent px-4 sm:px-6 border-b h-14 sm:h-auto'>
					<Sheet>
						<SheetTrigger asChild>
							<Button
								size='icon'
								variant='outline'
								className='sm:hidden'>
								<PanelLeft className='w-5 h-5' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left' className='sm:max-w-xs'>
							<nav className='gap-6 grid font-medium text-lg'>
								<Link
									href='#'
									className='flex justify-center items-center gap-2 bg-primary rounded-full w-10 h-10 font-semibold text-lg text-primary-foreground md:text-base group shrink-0'>
									<Package2 className='group-hover:scale-110 w-5 h-5 transition-all' />
									<span className='sr-only'>Acme Inc</span>
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<Home className='w-5 h-5' />
									Dashboard
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<ShoppingCart className='w-5 h-5' />
									Orders
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-foreground'>
									<Package className='w-5 h-5' />
									Products
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<Users2 className='w-5 h-5' />
									Customers
								</Link>
								<Link
									href='#'
									className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
									<LineChart className='w-5 h-5' />
									Settings
								</Link>
							</nav>
						</SheetContent>
					</Sheet>

					<div className='relative flex-1 ml-auto md:grow-0'>
						<Search className='top-2.5 left-2.5 absolute w-4 h-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='bg-background pl-8 rounded-lg w-full md:w-[200px] lg:w-[336px]'
						/>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='icon'
								className='rounded-full overflow-hidden'>
								<Image
									src='/placeholder-user.webp'
									width={36}
									height={36}
									alt='Avatar'
									className='rounded-full overflow-hidden'
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className='flex-1 items-start gap-4 md:gap-8 grid sm:px-6 sm:py-0 p-4'>
					{children}
				</main>
			</div>
		</div>
	);
};

export default layout;
