import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import {
  Camera,
  Home,
  User,
  Settings,
  Tag,
  EyeOff,
  BookOpen,
  CircleCheck,
  Users,
  UserPlus,
  LogIn,
} from "lucide-react";


const OrgOverview = () => {
  const spacesItems = [
    {
      id: 1,
      name: "Community Contributors",
      tags: [Settings, Tag, EyeOff],
      description: "Space 1 description",
      contributers: 487,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      opentask: "5",
    },
    {
      id: 2,
      name: "Developers Contributors",
      tags: [Settings, Tag, EyeOff],
      description: "Space 2 description",
      contributers: 440,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      opentask: "2",
    },
    {
      id: 3,
      name: "Space 3",
      tags: [Settings, Tag, EyeOff],
      description: "Space 3 description",
      contributers: 680,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      opentask: "5",
    },
    // {
    //   id: 3,
    //   name: "Space 3",
    //   tags: ["tag1", "tag2"],
    //   description: "Space 3 description",
    //   contributers: 680,
    //   createdAt: "2023-01-01",
    //   updatedAt: "2023-01-01",
    // },
  ];

  const OpentaskList = [
    {
      id: 1,
      name: "Post about TEN (reserved)",
      icon: "task2",
      description: "task 1 description",
      createdDate: "2023-01-01",
      days: 5,
    },
    {
      id: 2,
      name: "Submit your contribution (Twitter/X threads)",
      icon: "task2",
      description: "Tasl 2 description",
      createdDate: "2023-01-01",
      days: 9,
    },
    {
      id: 2,
      name: "Re test the whole user flow",
      icon: "task2",
      description: "Tasl 2 description",
      createdDate: "2023-01-01",
      days: 11,
    },
  ];

  const AboutTags = ["Privacy", "ethereum", "L2", "layer2"];

  return (
    <div className="grid grid-rows-4 h-screen w-full">
      <div className="row-span-1">
        <div className="flex  justify-between h-full">
          <div className="flex gap-2 justify-center items-center px-10">
            <Image src="/image.png" width={100} height={100} alt="logo" />
            <div className="flex flex-col ">
              <h1 className=" text-[30px]">Ten formerly Obscuro</h1>
              <p className="text-[14px] text-slate-400">Encyrpting Ethereum</p>
              <div className="flex text-sm text-slate-600 mt-4">
                <span>Time to payment 0.0 days </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-4 gap-6 justify-center">
            {/* <Button className="w-24 bg-[#7D6CE2FF] flex justify-between">
              <LogIn className="w-[20px] h-[20px]" />
              Login
            </Button> */}
            <Button className="w-24 bg-[#7D6CE2FF] flex justify-between">
              <UserPlus className="w-[20px] h-[20px]" /> Follow
            </Button>
          </div>
        </div>
      </div>

      <div className="row-span-4 border-t-2  ">
        <div className="grid grid-cols-4 h-full">
          <div className="col-span-3 ">
            <div className="grid grid-rows-3 h-full">
              <div className="p-8">
                <h1 className="text-xl text-slate-500 mb-2">Spaces</h1>
                <div className="flex gap-1 overflow-hidden flex-wrap">
                  {spacesItems.map((spaceItem, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[330px] h-[120px] border-2 border-slate-300 rounded-md p-2 "
                      >
                        <h1 className="text-lg text-slate-400">
                          {spaceItem.name}
                        </h1>
                        <div className="flex gap-2 mt-2">
                          {spaceItem.tags.map((Tag, index) => {
                            return (
                              <div
                                key={index}
                                className="text-xs text-slate-400 cursor-pointer   "
                              >
                                <Tag className="w-8 h-8  " />
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-between py-2 text-slate-600">
                          <div className="text-md flex items-center  gap-1 ">
                            <CircleCheck className="w-4 h-4 " />
                            {spaceItem.opentask} <span>Open tasks</span>
                          </div>
                          <div className="text-md flex  items-center gap-1 ">
                            <Users className="w-4 h-4 " />
                            {spaceItem.contributers} <span>Contributers</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 border-t-2 mr-10  ">
                <h1 className="text-xl text-slate-500 mb-2">Open Tasks</h1>
                <ul className="flex gap-4 flex-col overflow-hidden flex-wrap">
                  {OpentaskList.map((opentask, index) => {
                    return (
                      <li
                        key={index}
                        className="flex gap-4 items-center w-full shadow-md p-2 "
                      >
                        <CircleCheck className="w-5 h-5 " />
                        <h1 className="text-lg text-slate-400">
                          {opentask.name}
                        </h1>
                        <span className="ml-auto text-slate-400 ">
                          {opentask.days} days ago
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="py-8 flex flex-col gap-4 pr-20 ">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl text-slate-400 mb-2 font-bold">About</h1>
              <p className="text-slate-400 text-left">
                We're building the first general. purpose, EVM equivalent,
                encrypted L2 for Ethereum
              </p>
              <div className="flex gap-4 flex-wrap overflow-hidden">
                {AboutTags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-[#7D6CE2FF] px-2  rounded-md text-white "
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-10">
              <h1 className="text-xl text-slate-400 mb-2 font-bold">
                Contributers
              </h1>
              <div className=" relative border-2 border-slate-400 w-fit h-fit flex items-center justify-center gap-2 rounded-full text-white p-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                {/* <span className="absolute text-black top-50 text-lg">A</span> */}
              </div>
              <Button className="bg-[#7D6CE2FF] text-lg w-fit">
                Invite Contributors
              </Button>
            </div>
            <div className="flex flex-col gap-4 mt-10">
              <h1 className="text-xl text-slate-400 mb-2 font-bold">Admins</h1>
              <div className=" relative border-2 border-slate-400 w-fit h-fit flex items-center justify-center gap-2 rounded-full text-white p-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgOverview;
