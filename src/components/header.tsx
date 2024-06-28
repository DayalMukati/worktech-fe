'use client';
import React from 'react';
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
import { useAppDispatch, useAppSelector } from '@/hooks/toolKitTyped';
import {
	setIsLoginModalOpen,
	setIsSignupModalOpen,
	setOrgCreationModal
} from '@/store/layoutSlice';
import LoginModal from './login-modal';
import SignupModal from './signup-modal';
import {
	loadUser,
	logoutUser,
	selectUserAuth
} from '@/store/authSlice';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_TOKEN } from '@/graphql/queries';
import { User } from '@/graphql/__generated__/graphql';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/use-session';

const Header = () => {
	const { session, logout } = useSession();
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { user, walletAddress } = useAppSelector(selectUserAuth);

	const { loading: isUserDataLoading } = useQuery(GET_USER_BY_TOKEN, {
		onCompleted: data => {
			dispatch(loadUser(data.getUserByToken as User));
		}
	});

	const handleLogout = () => {
		logout();
		dispatch(logoutUser());
		router.push('/');
	};
	return (
		<>
			<header className='top-0 z-30 sm:static sticky flex items-center gap-4 bg-background px-4 sm:px-6 border-b h-14'>
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
						className='bg-background pl-8 w-full md:w-[200px] lg:w-[336px] focus-visible:ring-0 focus:ring-0 rounded-full'
					/>
				</div>
				{user?._id ? (
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
							<DropdownMenuLabel
								className='cursor-pointer'
								onClick={() => router.push('/dashboard/profile')}>
								My Account
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<>
						<Button
							onClick={() => dispatch(setIsLoginModalOpen(true))}>
							Connect
						</Button>
					</>
				)}
			</header>
			<LoginModal />
			<SignupModal />
		</>
	);
};

export default Header;
