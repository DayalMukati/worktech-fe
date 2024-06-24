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

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import DashboardSidebar from '@/components/dashboard-sidebar';
import OrgSidebar from "@/components/org-sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  const currentURI = usePathname();
  const isPathMatch = (currentPath: string, menuItemHref: string): boolean => {
    return currentPath === menuItemHref;
  };

  const Icons: { [key: string]: JSX.Element } = {
    Home: <Home className="w-5 h-5" />,
    FolderKanban: <FolderKanban className="w-5 h-5" />,
  };
  const menuItems = [
    {
      href: "/dashboard",
      icon: "Home",
      label: "Orgs",
    },
    {
      href: "/dashboard/projects",
      icon: "FolderKanban",
      label: "Projects",
    },
  ];
  return (
    <div className="flex flex-col bg-muted/40 w-full h-screen">
      <Sidebar />

      <main className="gap-4 md:gap-8 grid grid-cols-5 sm:py-0 sm:pl-20 h-full overflow-y-hidden">
        {/* <DashboardSidebar Title="Ten (Formaly known as Org) Overview)" /> */}
        <OrgSidebar Title="Ten (Formaly known as Org) Overview)" />
        <div className="col-span-4 mt-2 h-full overflow-auto">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
};

export default layout;
