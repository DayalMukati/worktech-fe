import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Icons } from "./icons";
import { space } from "postcss/lib/list";
import { LayoutDashboard, ChevronsLeft, Trophy, BarChart4 } from "lucide-react";

const OrgSidebar = ({ Title }: { Title: string }) => {
  const currentURI = usePathname();
  const isPathMatch = (currentPath: string, menuItemHref: string): boolean => {
    return currentPath === menuItemHref;
  };
  const menuItems = [
    {
      href: "/dashboard/org-overview",
      icon: <LayoutDashboard className="w-6 h-6 " />,
      label: "Overview",
    },
    // {
    //   href: "/dashboard/tasks",
    //   icon: "FolderKanban",
    //   label: "Tasks",
    // },
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

  const SpacesItem = [
    {
      href: "/dashboard/space-1",
      icon: "Package",
      label: "Community Contributions",
    },
    {
      href: "/dashboard/space-2",
      icon: "Users2",
      label: "Developer challenges",
    },
  ];
  return (
    <aside className="border-1 h-full col-span-1 bg-secondary p-2 border  ">
      <div className="py-4 flex items-center  ">
        <h2 className="text-lg overflow-hidden whitespace-nowrap text-ellipsis ">
          {Title}
        </h2>
        <ChevronsLeft className="w-6 h-6 rounded-full  bg-slate-900 text-white cursor-pointer hover:bg-slate-700" />
      </div>
      <nav className="h-[30rem]">
        <ul className="space-y-4">
          {menuItems.map(({ href, icon, label }, index) => (
            <li className="flex gap-1 items-center " key={index}>
              {icon}
              <Button
                className={cn(
                  "flex justify-start p-0 bg-transparent hover:bg-primary/10 w-full tracking-widest text-xl  text-black"
                  //   isPathMatch(currentURI, href)
                  //     ? "text-primary-foreground bg-black hover:text-primary-foreground hover:bg-primary"
                  //     : ""
                )}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            </li>
          ))}
        </ul>

        <ul className="mt-10">
          {childItem.map(({ href, icon, label }, index) => (
            <li className="flex gap-1 items-center" key={index}>
              {icon}
              <Button
                className={cn(
                  "flex justify-start bg-transparent hover:bg-primary/10 w-full tracking-widest text-xs p-0 py-1 h-full text-slate-500"
                  //   isPathMatch(currentURI, href)
                  //     ? "text-primary-foreground bg-black hover:text-primary-foreground hover:bg-primary"
                  //     : ""
                )}
                asChild
              >
                <Link href={href}>{label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <Spaces spacesItem={SpacesItem} />
    </aside>
  );
};

export default OrgSidebar;

export const Spaces = ({
  spacesItem,
}: {
  spacesItem: {
    href: string;
    icon: string;
    label: string;
  }[];
}) => {
  return (
    <div className="flex flex-col items-start mt-auto">
      <h1 className="text-lg text-slate-500">SPACES</h1>
      {spacesItem.map(({ href, icon, label }, index) => (
        <Button
          variant={"secondary"}
          key={index}
          className={
            cn("p-0  text-slate-400  ")
            //   isPathMatch(currentURI, href)
            //     ? "text-primary-foreground bg-black hover:text-primary-foreground hover:bg-primary"
            //     : ""
          }
          asChild
        >
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </div>
  );
};
