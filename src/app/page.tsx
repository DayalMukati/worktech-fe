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

const page = async () => {
	return (
		<>
			<Header />
			<Tabs
				defaultValue='orgs'
				className='flex flex-col items-center w-full'>
				<TabsList className='mt-8'>
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
