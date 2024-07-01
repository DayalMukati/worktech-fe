import type { Metadata } from 'next';

import './globals.css';

import Providers from '@/components/providers';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
	title: 'OneWork',
	description: 'A project management tool for teams'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={''}>
				<Providers>
					<Sidebar />
					{children}
				</Providers>
			</body>
		</html>
	);
}
