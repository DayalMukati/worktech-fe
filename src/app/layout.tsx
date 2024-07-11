import type { Metadata } from 'next';

import './globals.css';

import Providers from '@/components/providers';
import Sidebar from '@/components/sidebar';
import { getIronSession } from 'iron-session';
import { SessionData, sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { Toaster } from '@/components/ui/toaster';

import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
	title: 'OneWork',
	description: 'A project management tool for teams'
};

async function getSession() {
	const session = await getIronSession<SessionData>(
		cookies(),
		sessionOptions
	);

	return session;
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getSession();
	console.log(session);
	return (
		<html lang='en'>
			<body className={''}>
				<NextTopLoader color='hsl(262, 83%, 58%)' />
				<Providers>
					<Sidebar />
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
