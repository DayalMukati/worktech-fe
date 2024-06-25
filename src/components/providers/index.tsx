'use client';
import { store } from '@/store';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import GQLProvider from './graphql-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ReduxProvider store={store}>
				<GQLProvider>
					<TooltipProvider skipDelayDuration={50} delayDuration={80}>
						{children}
					</TooltipProvider>
				</GQLProvider>
			</ReduxProvider>
		</>
	);
};

export default Providers;
