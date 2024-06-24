'use client'
import OpenTaskList from '@/components/open-task-list';
import OrgList from '@/components/org-listings';
import TaskCardItem from '@/components/task-card-item';
import Contributors  from '@/components/contributors';
import Leaderboard from '@/components/leaderboard'

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';

import React from 'react';

const page = () => {
	return (
		<Tabs
			defaultValue='orgs'
			className='flex flex-col items-center mt-6 w-full'>
			<TabsList className=''>
				<TabsTrigger value='orgs'>Orgs</TabsTrigger>
				<TabsTrigger value='tasks'>Tasks</TabsTrigger>
				<TabsTrigger value='contributors'>Contributors</TabsTrigger>
				{/* <TabsTrigger value='leaderboard'>Leaderboard</TabsTrigger> */}
			</TabsList>
			<TabsContent value='orgs'>
				<OrgList />
			</TabsContent>
			<TabsContent value='tasks'>
				<OpenTaskList />
			</TabsContent>
			<TabsContent value='contributors'><Contributors /></TabsContent>
			{/* <TabsContent value='leaderboard'><Leaderboard /></TabsContent> */}
		</Tabs>
	);
};

export default page;
