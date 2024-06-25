import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { space } from "postcss/lib/list";
import {
  LayoutDashboard,
  ChevronsLeft,
  Trophy,
  BarChart4,
  PlusIcon,
} from "lucide-react";
import SpacesAddModal from "./spaces-add-modal";
import { setIsCreateSpaceModalOpen } from "@/store/layoutSlice";
import { useAppDispatch } from "@/hooks/toolKitTyped";
import { useSelector } from "react-redux";
import { selectSpaces } from "@/store/spacesSlice";

const isPathMatch = (currentPath: string, menuItemHref: string): boolean => {
  return currentPath === menuItemHref;
};
var currentURl = "";

const OrgSidebar = ({ Title }: { Title: string }) => {
  const { spaces } = useSelector(selectSpaces);

  const currentURI = usePathname();

  currentURl = currentURI;
  const menuItems = [
    {
      href: "/orgs/org-overview",
      icon: <LayoutDashboard className="w-6 h-6 " />,
      label: "Overview",
    },
    {
      href: "/orgs/org-overview/tasks",
      icon: "FolderKanban",
      label: "Tasks",
    },
    {
      href: "/orgs/org-overview/leaderboard",
      icon: <Trophy className="w-4 h-4 " />,
      label: "Leadership Boards",
    },
  ];

  const childItem = [
    {
      href: "/dashboard/leadership",
      icon: <Trophy className="w-4 h-4 " />,
      label: "Leadership Boards",
    },
    {
      href: "/dashboard/users",
      icon: <BarChart4 className="w-4 h-4 " />,
      label: "Combined Boards",
    },
  ];

  return (
    <aside className="col-span-1 bg-background border-r h-screen">
      <div className="p-3.5 border-b-2 ">
        <h2 className="text-xl">Dashboard</h2>
      </div>
      <nav className="p-4 h-1/2 border-b-2 ">
        <ul className="space-y-2">
          {menuItems.map(({ href, icon, label }) => (
            <li>
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
    name: string;
    visibility: boolean;
  }[];
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-start mt-auto p-2">
      <div className="p-3.5 w-full  flex justify-between items-center ">
        <h2 className="text-xl">Spaces</h2>
        <PlusIcon
          className="w-6 h-6 rounded-full  cursor-pointer hover:bg-slate-300"
          onClick={() => dispatch(setIsCreateSpaceModalOpen(true))}
        />
      </div>
      <nav className="">
        <ul className="">
          {spacesItem.map(({ name, visibility }, index) => (
            <li>
              <Button
                className={cn(
                  "flex justify-start bg-transparent hover:bg-primary/10 w-full text-foreground transition-colors shadow-md",
                  isPathMatch(currentURl, name) || currentURl.startsWith(name)
                    ? "text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary"
                    : ""
                )}
                asChild
              >
                <Link href={name}>{name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
