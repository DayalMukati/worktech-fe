import { Building2, FolderKanban, Home, Package2, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { checkPathMatch, cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import { setOrgCreationModal } from "@/store/layoutSlice";
import OrgCreationModal from "./org-creation-modal";
import { loadOrgs, selectOrg } from "@/store/orgSlice";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "./ui/avatar";
import { useMutation, useQuery } from "@apollo/client";
import { LIST_ALL_ORGS_BY_USER_QUERY } from "@/graphql/queries";
import { Orgs } from "@/graphql/__generated__/graphql";
import { CREATE_ORG_MUTATION } from "@/graphql/mutation";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const currentURI = usePathname();

  const { orgs } = useAppSelector(selectOrg);

  const { loading: isLoadingOrgs } = useQuery(LIST_ALL_ORGS_BY_USER_QUERY, {
    onCompleted: (data) => {
      dispatch(loadOrgs(data.listAllOrgsByUser as Orgs[]));
    },
  });

  const Icons: { [key: string]: JSX.Element } = {
    Home: <Home className="w-5 h-5" />,
    FolderKanban: <FolderKanban className="w-5 h-5" />,
  };
  const menuItems = [
    {
      href: "/dashboard",
      icon: "Home",
      label: "Dashboard",
    },
  ];

  return (
    <>
      <aside className="left-0 z-10 fixed inset-y-0 sm:flex flex-col hidden bg-background border-r w-20">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          {menuItems.map(({ href, icon, label }) => (
            <Tooltip key={href}>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={cn(
                    "flex justify-center items-center  rounded-lg w-10 h-10 hover:text-foreground transition-colors",
                    "text-accent-foreground bg-accent",
                    checkPathMatch(currentURI, href)
                      ? "text-primary-foreground bg-primary hover:text-primary-foreground hover:bg-primary"
                      : "text-muted-foreground rounded-full"
                  )}
                >
                  {Icons[icon]}
                  <span className="sr-only">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{label}</TooltipContent>
            </Tooltip>
          ))}
          {orgs.map(({ name, _id }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" size={"icon"}>
                  <Link href={`/orgs/org-overview/${_id}`}>
                    <Avatar  className="w-24 h-24 cursor-pointer">
                      {name.charAt(0)} 
                    </Avatar>
                    <span className="sr-only">{name}</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{name}</TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => dispatch(setOrgCreationModal(true))}
                variant="outline"
                size={"icon"}
              >
                <Plus className="w-5 h-5" />
                <span className="sr-only">{"Create Org"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">{"Create Org"}</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <OrgCreationModal />
    </>
  );
};

export default Sidebar;
