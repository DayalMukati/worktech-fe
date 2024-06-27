'use client';
import OpenTaskList from '@/components/open-task-list';
import OrgList from '@/components/org-listings';
import TaskCardItem from '@/components/task-card-item';
import Contributors from '@/components/contributors';
import Image from 'next/image';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';
import Icons from '@/components/ui/icon';
import React from 'react';
import Header from '@/components/header';

const page = () => {
	return (
		<>
			{/* <div className="z-10 fixed flex bg-white shadow-lg w-full">
        <div className="flex justify-start items-start mx-12 w-full">
          <a
            href="#"
            target="_blank"
            className="font-semibold text-primary-500"
          >
            <Image
              src="/image.png"
              alt="Logo"
              width={60}
              height={30}
              className="m-2"
            />
          </a>
          <button className="flex justify-center items-center bg-primary mt-6 ml-auto px-3 py-1 rounded-md text-white">
            <Icons icon="mdi:wallet" className="mr-2 w-6 h-6"></Icons> Connect
          </button>
        </div>
      </div> */}
			<Header />
			<Tabs
				defaultValue='orgs'
				className='flex flex-col items-center w-full'>
				<TabsList className='mt-24'>
					<TabsTrigger value='orgs'> Organizations</TabsTrigger>
					<TabsTrigger value='tasks'>Tasks</TabsTrigger>
					<TabsTrigger value='contributors'>Contributors</TabsTrigger>
				</TabsList>
				<TabsContent value='orgs'>
					<OrgList />
				</TabsContent>
				<TabsContent value='tasks'>
					<OpenTaskList />
				</TabsContent>
				<TabsContent value='contributors'>
					<Contributors />
				</TabsContent>
			</Tabs>
		</>
	);
};

export default page;
