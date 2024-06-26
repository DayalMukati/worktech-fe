import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Icons } from './icons';
import { space } from 'postcss/lib/list';
import {
	LayoutDashboard,
	ChevronsLeft,
	Trophy,
	BarChart4,
	PlusIcon
} from 'lucide-react';
import SpacesAddModal from './spaces-add-modal';
import { setIsCreateSpaceModalOpen } from '@/store/layoutSlice';
import { useAppDispatch } from '@/hooks/toolKitTyped';
import { useSelector } from 'react-redux';
import { selectSpaces, setSpaces } from "@/store/spacesSlice";
import { LIST_ALL_SPACES_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { ListAllSpacesQuery } from "@/graphql/__generated__/graphql";

const isPathMatch = (currentPath: string, menuItemHref: string): boolean => {
  return currentPath === menuItemHref;
};
var currentURl = "";

const OrgSidebar = ({ Title }: { Title: string }) => {
  const { spaces } = useSelector(selectSpaces);
  const dispatch = useAppDispatch();

  useQuery(LIST_ALL_SPACES_QUERY, {
    onCompleted: (data) => {
      console.log("data->", data.listAllSpaces);
      dispatch(
        setSpaces({
          spaces: data.listAllSpaces,
        })
      );
    },
  });

  //   console.log("spaces->", spaces);

  const currentURI = usePathname();

  currentURl = currentURI;
  const menuItems = [
    {
      href: "/orgs/org-overview",
      icon: <LayoutDashboard className="w-6 h-6" />,
      label: "Overview",
    },
    {
      href: "/orgs/org-overview/tasks",
      icon: "FolderKanban",
      label: "Tasks",
    },
    {
      href: "/orgs/org-overview/leaderboard",
      icon: <Trophy className="w-4 h-4" />,
      label: "Leadership Boards",
    },
  ];

  const childItem = [
    {
      href: "/dashboard/leadership",
      icon: <Trophy className="w-4 h-4" />,
      label: "Leadership Boards",
    },
    {
      href: "/dashboard/users",
      icon: <BarChart4 className="w-4 h-4" />,
      label: "Combined Boards",
    },
  ];

  return (
    <aside className="col-span-1 bg-background border-r h-screen">
      <div className="p-3.5 border-b-2">
        <h2 className="text-xl">Dashboard</h2>
      </div>
      <nav className="p-4 border-b-2 h-1/2">
        <ul className="space-y-2">
          {menuItems.map(({ href, icon, label }, index) => (
            <li key={index}>
              <Button
                className={cn(
                  "flex justify-start bg-transparent hover:bg-primary/10 w-full text-foreground transition-colors border-b-[2px]",
                  isPathMatch(currentURI, href) || currentURI.startsWith(href)
                    ? "text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary"
                    : ""
                )}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <Spaces spacesItem={spaces as any} />
      <SpacesAddModal />
    </aside>
  );
};

export default OrgSidebar;

export const Spaces = ({
  spacesItem,
}: {
  spacesItem: {
    _id: string;
    name: string;
    visibility: boolean;
  }[];
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-start mt-auto p-2 w-[100%">
      <div className="flex justify-between  p-3.5 items-center  w-full">
        <h2 className="text-xl">Spaces</h2>
        <PlusIcon
          className="hover:bg-slate-300 rounded-full w-6 h-6 cursor-pointer"
          onClick={() => dispatch(setIsCreateSpaceModalOpen(true))}
        />
      </div>
      <nav className="w-full">
        <ul className="">
          {spacesItem.map(({ _id, name, visibility }, index) => (
            <li key={index}>
              <Button
                className={cn(
                  "flex justify-start bg-transparent  hover:bg-primary/10 w-full text-foreground transition-colors shadow-md",
                  currentURl.endsWith(_id)
                    ? "text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary"
                    : ""
                )}
                asChild
              >
                {/* <Link href={`${name}/${_id}`}>{name}</Link> */}
                <Link href={`/orgs/org-overview/space/${_id}/tasks`}>
                  {name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
