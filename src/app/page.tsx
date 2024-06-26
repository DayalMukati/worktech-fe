"use client";
import OpenTaskList from "@/components/open-task-list";
import OrgList from "@/components/org-listings";
import TaskCardItem from "@/components/task-card-item";
import Contributors from "@/components/contributors";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icons from "@/components/ui/icon";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex shadow-lg fixed w-full bg-white z-10">
        <div className="flex justify-start items-start w-full mx-12">
          <a
            href="#"
            target="_blank"
            className="text-primary-500 font-semibold"
          >
            <Image
              src="/image.png"
              alt="Logo"
              width={60}
              height={30}
              className="m-2"
            />
          </a>
          <button className="flex justify-center items-center bg-primary text-white  px-3 py-1 rounded-md mt-6 ml-auto">
            <Icons icon="mdi:wallet" className="w-6 h-6 mr-2"></Icons> Connect
          </button>
        </div>
      </div>
      <Tabs defaultValue="orgs" className="flex flex-col items-center w-full">
        <TabsList className=" mt-24">
          <TabsTrigger value="orgs"> Organizations</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
        </TabsList>
        <TabsContent value="orgs">
          <OrgList />
        </TabsContent>
        <TabsContent value="tasks">
          <OpenTaskList />
        </TabsContent>
        <TabsContent value="contributors">
          <Contributors />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default page;
