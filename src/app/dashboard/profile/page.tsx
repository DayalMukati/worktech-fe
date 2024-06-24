import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { CircleHelp, CirclePlus, Coffee, Zap } from "lucide-react";
import React from "react";

const Profile = () => {
  return (
    <div className="grid grid-cols-3 h-screen gap-2  p-12">
      <div className="col-span-1 ">
        <div className="flex h-full flex-col justify-between items-center gap-1 ">
          <div className="h-1/2  w-full rounded-md border border-slate-200 flex flex-col items-center justify-center gap-1 p-4">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="w-28 h-28 rounded-full "
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <span className="text-md  text-slate-400 font-[700]">D-86878</span>
            <p className="text-xs text-slate-300">No bio.</p>

            <Button className="bg-[#7D6CE2FF] text-xs w-full h-fit mt-2">
              Edit Profile
            </Button>
            <Button className="bg-[#7D6CE2FF] text-xs w-full h-fit">
              Settings
            </Button>
          </div>

          <div className="h-fit w-full rounded-md border border-slate-200 p-4 text-slate-400 flex flex-col gap-8  ">
            <div className="flex  gap-2 items-center text-md">
              <h1>REPUATION SCORE</h1>
              <CircleHelp className="text-slate-400 w-4 h-4" />
            </div>
            <div className="flex flex-col text-md">
              <h1>EARNINGS</h1>
              <span>$0.00</span>
            </div>
            <div className="flex flex-col text-md">
              <h1>REVENUE SHARE</h1>
              <span>1.00%</span>
            </div>
          </div>
          <div className="h-fit w-full rounded-md border border-slate-200 p-4 text-slate-400 flex flex-col gap-8 ">
            <div className="w-full">
              <h1>ORGANIZATIONS</h1>
              <div className="border-[#7D6CE2FF] border-2 rounded-md flex gap-2 p-2">
                <Zap className="w-6 h-6 text-black" />
                KC
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 space-y-1 ">
        <div className="flex flex-col h-1/2 rounded-md border border-slate-200 p-2 ">
          <h1 className="text-md text-slate-400">Featured work</h1>

          <div className="flex flex-col gap-2 p-2 justify-center items-center mt-10">
            <CirclePlus className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="text-md text-slate-400">
              Feature work to show your experience
            </span>
          </div>
        </div>
        <div className="flex flex-col h-1/2  rounded-md border-2 border-slate-200  p-2">
          <h1 className="text-md text-slate-400">Contribution</h1>
          <div className="flex flex-col gap-2 p-2 justify-center items-center mt-10">
            <Coffee className="w-12 h-12 text-slate-900 cursor-pointer" />
            <span className="text-md text-slate-400">
              No pubic tasks completed yet
            </span>
            <Button className="bg-[#7D6CE2FF] text-md px-4  h-fit mt-2">
              Explore open tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
