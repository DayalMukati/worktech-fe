'use client';

import { FolderKanban, Home } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useParams } from 'next/navigation';

import Header from '@/components/header';
import OrgSidebar from '@/components/org-sidebar';
import useSession from '@/hooks/use-session';

const OrgOverviewLayout = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const { session } = useSession();

	const params = useParams<{ orgId: string }>();
	return (
		<div className='flex flex-col bg-muted/40 w-full h-screen'>
			<main
				className={cn(
					'grid grid-cols-4 lg:grid-cols-6 sm:py-0 sm:pl-20 h-full overflow-y-hidden',
					session.authToken ? 'sm:pl-20' : 'sm:pl-0'
				)}>
				<OrgSidebar
					Title='Ten (Formaly known as Org) Overview)'
					orgId={params.orgId}
				/>
				<div className='col-span-3 lg:col-span-5 mt-2 h-full overflow-auto'>
					<Header />
					{children}
				</div>
			</main>
		</div>
	);
};

export default OrgOverviewLayout;
