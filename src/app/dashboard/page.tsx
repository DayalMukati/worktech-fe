import OpenTaskList from '@/components/open-task-list';
import OrgList from '@/components/org-listings';
import TaskCardItem from '@/components/task-card-item';
import Contributors from '@/components/contributors';

import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';

import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';

async function getSession() {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	return session;
}

const page = async () => {
	const session = await getSession();

	if (!session.authToken) {
		redirect('/');
	}
	return (
		<Tabs
			defaultValue='orgs'
			className='flex flex-col items-center mt-6 w-full'>
			<TabsList className=''>
				<TabsTrigger value='orgs'>Organizations</TabsTrigger>
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
			<TabsContent value='contributors'>
				<Contributors />
			</TabsContent>
			{/* <TabsContent value='leaderboard'><Leaderboard /></TabsContent> */}
		</Tabs>
	);
};

export default page;
