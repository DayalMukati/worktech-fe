'use client';

import { FolderKanban, Home } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';

import Header from '@/components/header';
import DashboardSidebar from '@/components/dashboard-sidebar';
import useSession from '@/hooks/use-session';
import { useEffect } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSession();

  const router = useRouter();

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

  useEffect(() => {
    if (!session.authToken) {
      router.push("/");
    }
  }, []);

  return (
    <div className="flex flex-col bg-muted/40 w-full h-screen">
      <main className="gap-0 grid grid-cols-7 bg-background sm:py-0 sm:pl-20 h-full overflow-y-hidden">
        <DashboardSidebar />
        <div className="col-span-6 h-full overflow-auto">
          <Header />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
