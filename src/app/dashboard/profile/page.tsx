"use client";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { GET_USER_BY_TOKEN } from "@/graphql/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icon";
import useSession from "@/hooks/use-session";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import PageGrid from "@/components/ui/pageGrid";

import { usePathname } from "next/navigation";
import { getInitials } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/toolKitTyped";
import { loadOrgs, selectOrg } from "@/store/orgSlice";
import { LIST_ALL_ORGS_BY_USER_QUERY } from "@/graphql/queries";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { session } = useSession();
  const pathname = usePathname();
  let orgUriId = "";

  if (pathname.startsWith("/orgs/") && pathname.split("/").length > 2) {
    const segments = pathname.split("/");
    orgUriId = segments[segments.length - 1];
  }

  const dispatch = useAppDispatch();
  const currentURI = usePathname();

  const { orgs } = useAppSelector(selectOrg);

  const { loading: isLoadingOrgs } = useQuery(
    LIST_ALL_ORGS_BY_USER_QUERY,

    {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        console.log({ listOrgs: data.listAllOrgsByUser });
        dispatch(loadOrgs(data.listAllOrgsByUser));
      },
    }
  );

  const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
    onCompleted: (data) => {
      // setUser(data.getUserByToken);
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const profileInfoRef = useRef<HTMLDivElement>(null);
  const editFormRef = useRef<HTMLDivElement>(null);

  const handleEditClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.add("hidden");
      editFormRef.current.classList.remove("hidden");
      setIsEditing(true);
    }
  };

  const handleCancelClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.remove("hidden");
      editFormRef.current.classList.add("hidden");
      setIsEditing(false);
    }
  };

  const handleSaveClick = () => {
    if (profileInfoRef.current && editFormRef.current) {
      profileInfoRef.current.classList.remove("hidden");
      editFormRef.current.classList.add("hidden");
      setIsEditing(false);
    }
  };
  // if (loading) return <PageGrid />;
  // if (error) return <ErrorDisplay errorMessage={error.message}/>
  return (
    <div className="flex mt-12 mb-6 px-36">
      <div className="flex flex-col gap-4 w-1/3">
        <div className="flex flex-col justify-between items-center gap-1 h-full">
          <div className="flex flex-col justify-center items-center gap-1 border-slate-300 bg-card shadow-lg mx-auto p-6 border rounded-md w-full max-w-md text-card-foreground">
            <div className="relative">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full w-28 h-28"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              {isEditing ? (
                <button
                  id="edit-button"
                  className="right-1 bottom-1 absolute bg-primary p-1 rounded-full text-primary-foreground"
                >
                  {" "}
                  <Icons icon="mdi:pencil"></Icons>
                </button>
              ) : (
                <button
                  className={`right-2 bottom-1 absolute p-2 border-2 border-white rounded-full shadow-xl  ${(status =
                    0 ? "bg-green-500" : "bg-red-700")}`}
                ></button>
              )}
            </div>
            <div
              id="profile-info"
              ref={profileInfoRef}
              className={`mt-4 text-center ${isEditing ? "hidden" : ""}`}
            >
              <h2 className="font-semibold text-lg">
                {data?.getUserByToken.email}
              </h2>
              <p className="text-muted-foreground">No bio..</p>
            </div>
            <div
              id="edit-form"
              ref={editFormRef}
              className={`mt-4 w-full ${isEditing ? "" : "hidden"}`}
            >
              <div className="mb-2">
                <input
                  type="text"
                  defaultValue={data?.getUserByToken.email as string}
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                />
              </div>
              <div className="mb-2">
                <textarea
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                  rows={2}
                >
                  Add a bio...
                </textarea>
              </div>
              <div className="flex justify-center items-center mb-2">
                <Icons icon="mdi:github" className="mr-2 w-8 h-8"></Icons>
                <input
                  type="text"
                  defaultValue="https://github.com/harsh"
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                />
              </div>
              <div className="flex justify-center items-center mb-2">
                <Icons
                  icon="hugeicons:user-status"
                  className="mr-2 w-8 h-8 text-slate-400"
                ></Icons>
                <input
                  type="text"
                  defaultValue="@"
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full  text-slate-700 text-foreground"
                />
              </div>
              <div className="flex justify-center items-center mb-2">
                <Icons
                  icon="mdi:linkedin"
                  className="mr-2 w-8 h-8 text-blue-900"
                ></Icons>

                <input
                  type="text"
                  defaultValue="https://www.linkedin.com/in/harsh"
				    placeholder="Enter Linkedin"
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                />
              </div>
              <div className="flex justify-center items-center mb-2">
                <Icons
                  icon="mdi:discord"
                  className="mr-2 w-8 h-8 text-[#5865F2]"
                ></Icons>

                <input
                  type="text"
                  defaultValue="#"
				  placeholder="Enter Twitter ID"
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                />
              </div>

              <div className="flex justify-center items-center mb-2">
                <Icons
                  icon="mdi:location-outline"
                  className="mr-2 w-8 h-8 text-primary"
                ></Icons>

                <input
                  type="text"
                  defaultValue="Indore,MP"
                  className="bg-input px-2 py-1 mt-1 border border-border rounded w-full text-slate-700 text-foreground"
                />
              </div>
            </div>
            {isEditing ? (
              <div className="flex justify-between">
                <Button
                  id="cancel-button"
                  className="bg-slate-300 hover:bg-slate-400 shadow mx-2 px-4 py-1 rounded-md text-slate-900"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button
                  id="save-button"
                  className="bg-primary px-4 py-1 rounded-md text-primary-foreground"
                  onClick={handleSaveClick}
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                id="settings-button"
                className="bg-primary px-4 py-1 rounded-md w-full text-primary-foreground"
                onClick={handleEditClick}
              >
                Edit Profile
              </Button>
            )}
            <Button
              id="settings-button"
              className="bg-primary mt-1 px-4 py-1 rounded-md w-full text-primary-foreground"
            >
              Settings
            </Button>
          </div>

          <div className="flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full h-fit text-slate-400">
            <div className="flex items-center gap-2 text-md">
              <h1 className="font-semibold text-slate-400 text-sm">
                REPUTATION SCORE
              </h1>
              <CircleHelp className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">EARNINGS</h1>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="font-semibold text-slate-400 text-sm">
                REVENUE SHARE
              </h1>
              <span>1.00%</span>
            </div>
          </div>
          <div className="flex flex-col gap-6 border-slate-300 shadow-lg p-4 border rounded-md w-full h-fit text-slate-400">
            <div className="w-full">
              <h1 className="font-semibold text-slate-400 text-sm">
                ORGANIZATIONS
              </h1>
              {orgs.map(({ name, _id }) => (
                <Link
                  className="flex space-x-4 m-2 w-full"
                  href={`/orgs/org-overview/${_id}`}
                >
                  <div className="flex gap-2 border-2  shadow-lg p-2 rounded-md w-full">
                    <Avatar className="font-bold text-lg h-8 w-8 text-white p-1 rounded-full items-center justify-center flex cursor-pointer bg-primary">
                      {getInitials(name.slice(0, 1).toUpperCase())}
                    </Avatar>
                    <span className="flex items-center justify-center">
                      {name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-1 mx-2 w-2/3">
        <div className="flex flex-col justify-center border-slate-300 shadow-lg p-2 border rounded-md h-[18rem]">
          <h1 className="font-semibold text-lg text-slate-600">
            Featured work
          </h1>
          <div className="flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3 h-full text-center">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="mt-4 font-semibold text-slate-500 text-sm">
              Feature work to show your experience
            </span>
          </div>
        </div>
        <div className="flex flex-col border-slate-300 bg-white shadow-lg p-2 border rounded-md">
          <p className="font-semibold text-lg text-slate-600">Contribution</p>
          <div className="flex flex-col justify-center items-center mt-4">
            <Coffee className="bg-secondary p-2 rounded-full w-16 h-16 text-slate-800 cursor-pointer" />
            <span className="text-md text-slate-400">
              No public tasks completed yet
            </span>
            <Link
              className="flex space-x-4 m-2 w-full justify-center items-center"
              href={`/dashboard`}
            >
              <Button className="bg-primary my-2 px-4 h-fit text-md">
                Explore open tasks
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
