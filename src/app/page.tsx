import OpenTaskList from '@/components/open-task-list';
import OrgList from '@/components/org-listings';
import Contributors from '@/components/contributors';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/tabs';
import React from 'react';
import Header from '@/components/header';

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

	if (session.authToken) {
		// console.log('session in root', { session });
		redirect('/dashboard');
	}

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
