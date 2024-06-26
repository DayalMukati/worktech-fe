'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BY_TOKEN } from '@/graphql/queries';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { CircleHelp, CirclePlus, Coffee, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface User {
  firstName: string;
}

interface QueryData {
  getUserByToken: User;
}

interface QueryVariables {
  token: string;
}

const Profile: React.FC<{ userToken: string }> = ({ userToken }) => {
  const [user, setUser] = useState<User | null>(null);
  const token = localStorage.getItem('token'); 
  
  console.log(token); 
  
  const { data, loading, error } = useQuery<QueryData, QueryVariables>(GET_USER_BY_TOKEN, {
    variables: { token: token || '' },  
  });
  useEffect(() => {
    if (data) {
      setUser(data.getUserByToken);
    }
  }, [data]);

  if (loading) return <p className='flex justify-center items-center h-full' >Loading...</p>;

  if (error) return <p className='flex justify-center items-center h-full'>Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-3 gap-2 px-36 p-6">
      <div className="col-span-1">
        <div className="flex h-full flex-col justify-between items-center gap-1">
          <div className="h-1/2 w-full rounded-md border border-slate-300 shadow-lg flex flex-col items-center justify-center gap-1 p-4">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-28 h-28 rounded-full"
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span className="text-md text-slate-400 font-[700]">
              {data?.getUserByToken?.firstName}
            </span>
            <p className="text-xs text-slate-300">No bio.</p>

            <Button className="bg-primary text-sm w-full mx-4 my-2 py-1 px-3">
              Edit Profile
            </Button>
            <Button className="bg-primary text-sm w-full mx-4">
              Settings
            </Button>
          </div>

          <div className="h-fit w-full rounded-md border border-slate-300 shadow-lg p-4 text-slate-400 flex flex-col gap-6">
            <div className="flex gap-2 items-center text-md">
              <h1 className="text-sm text-slate-400 font-semibold">
                REPUTATION SCORE
              </h1>
              <CircleHelp className="text-slate-400 w-4 h-4" />
            </div>
            <div className="flex flex-col text-md">
              <h1 className="text-sm text-slate-400 font-semibold">EARNINGS</h1>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col text-md">
              <h1 className="text-sm text-slate-400 font-semibold">
                REVENUE SHARE
              </h1>
              <span>1.00%</span>
            </div>
          </div>
          <div className="h-fit w-full rounded-md border border-slate-300 shadow-lg p-4 text-slate-400 flex flex-col gap-6">
            <div className="w-full">
              <h1 className="text-sm text-slate-400 font-semibold">
                ORGANIZATIONS
              </h1>
              <div className="border-primary/60 border-2 rounded-md flex gap-2 p-2">
                <Zap className="w-6 h-6 text-black" />
                KC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 space-y-1">
        <div className="flex flex-col h-1/2 rounded-md border border-slate-300 shadow-lg p-2">
          <h1 className="text-md text-slate-700 font-semibold">Featured work</h1>

          <div className="flex flex-col border border-dashed border-slate-400 p-6 justify-center items-center text-center h-full w-1/3">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="text-md text-slate-700 font-semibold">
              Feature work to show your experience
            </span>
          </div>
        </div>
        <div className="flex flex-col h-3/7 rounded-md border border-slate-300 shadow-lg bg-white p-2">
          <h1 className="text-lg text-slate-700 font-semibold">Contribution</h1>
          <div className="flex flex-col gap-2 p-2 justify-center items-center mt-10">
            <Coffee className="w-16 h-16 text-slate-900 cursor-pointer bg-slate-300 rounded-full p-2" />
            <span className="text-md text-slate-400">
              No public tasks completed yet
            </span>
            <Button className="bg-primary text-md px-4 h-fit mt-2">
              Explore open tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
