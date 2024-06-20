import Image from 'next/image';
import Link from 'next/link';
import {
	File,
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

const layout = ({ children }: { children: React.ReactNode }) => {
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
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center rounded-lg w-9 md:w-8 h-9 md:h-8 text-muted-foreground hover:text-foreground transition-colors'>
								<Home className='w-5 h-5' />
								<span className='sr-only'>Dashboard</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Dashboard</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center bg-accent rounded-lg w-9 md:w-8 h-9 md:h-8 text-accent-foreground hover:text-foreground transition-colors'>
								<ShoppingCart className='w-5 h-5' />
								<span className='sr-only'>Orders</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Orders</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center rounded-lg w-9 md:w-8 h-9 md:h-8 text-muted-foreground hover:text-foreground transition-colors'>
								<Package className='w-5 h-5' />
								<span className='sr-only'>Products</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Products</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center rounded-lg w-9 md:w-8 h-9 md:h-8 text-muted-foreground hover:text-foreground transition-colors'>
								<Users2 className='w-5 h-5' />
								<span className='sr-only'>Customers</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Customers</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center rounded-lg w-9 md:w-8 h-9 md:h-8 text-muted-foreground hover:text-foreground transition-colors'>
								<LineChart className='w-5 h-5' />
								<span className='sr-only'>Analytics</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Analytics</TooltipContent>
					</Tooltip>
				</nav>
				<nav className='flex flex-col items-center gap-4 mt-auto px-2 sm:py-5'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Link
								href='#'
								className='flex justify-center items-center rounded-lg w-9 md:w-8 h-9 md:h-8 text-muted-foreground hover:text-foreground transition-colors'>
								<Settings className='w-5 h-5' />
								<span className='sr-only'>Settings</span>
							</Link>
						</TooltipTrigger>
						<TooltipContent side='right'>Settings</TooltipContent>
					</Tooltip>
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
					<Breadcrumb className='md:flex hidden'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href='#'>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href='#'>Products</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>All Products</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
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
