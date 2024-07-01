import type { Metadata } from 'next';

import './globals.css';

import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: "OneWork",
  description: "A project management tool for teams",
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={''}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
