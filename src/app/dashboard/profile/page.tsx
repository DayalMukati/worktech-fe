"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "@/graphql/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { loadUser, selectUserAuth } from "@/store/authSlice";
import useSession from "@/hooks/use-session";
interface User {
  firstName: string;
}

interface QueryData {
  getUserByToken: User;
}

interface QueryVariables {
  token: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);

  const { data, loading, error } = useQuery(GET_USER_BY_TOKEN, {
    onCompleted: (data) => {
      setUser(data.getUserByToken as User);
    },
  });

  if (loading)
    return (
      <p className="flex justify-center items-center h-full">Loading...</p>
    );

  if (error)
    return (
      <p className="flex justify-center items-center h-full">
        Error: {error.message}
      </p>
    );

  return (
    <div className="gap-2 grid grid-cols-3 px-36 p-6">
      <div className="col-span-1">
        <div className="flex flex-col justify-between items-center gap-1 h-full">
          <div className="flex flex-col justify-center items-center gap-1 border-slate-300 shadow-lg p-4 border rounded-md w-full h-1/2">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full w-28 h-28"
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span className="font-[700] text-md text-slate-700">
              {data?.getUserByToken?.firstName || "Username"}
            </span>
            <p className="text-slate-300 text-xs">No bio.</p>

            <Button className="bg-primary mx-4 my-2 px-3 py-1 w-full text-sm">
              Edit Profile
            </Button>
            <Button className="bg-primary mx-4 w-full text-sm">Settings</Button>
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
              <div className="flex gap-2 border-2 border-primary/60 p-2 rounded-md">
                <Zap className="w-6 h-6 text-black" />
                KC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-1 col-span-2">
        <div className="flex flex-col border-slate-300 shadow-lg p-2 border rounded-md h-1/2">
          <h1 className="font-semibold text-md text-slate-700">
            Featured work
          </h1>

          <div className="flex flex-col justify-center items-center border-slate-400 p-6 border border-dashed w-1/3 h-full text-center">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="font-semibold text-md text-slate-700">
              Feature work to show your experience
            </span>
          </div>
        </div>
        <div className="flex flex-col border-slate-300 bg-white shadow-lg p-2 border rounded-md h-3/7">
          <h1 className="font-semibold text-lg text-slate-700">Contribution</h1>
          <div className="flex flex-col justify-center items-center gap-2 mt-10 p-2">
            <Coffee className="bg-slate-300 p-2 rounded-full w-16 h-16 text-slate-900 cursor-pointer" />
            <span className="text-md text-slate-400">
              No public tasks completed yet
            </span>
            <Button className="bg-primary mt-2 px-4 h-fit text-md">
              Explore open tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
