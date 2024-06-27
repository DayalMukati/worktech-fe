'use client';
import '../styles/globals.css';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import React from 'react';

export function getLibrary(provider: any): Web3Provider {
	const library = new Web3Provider(provider);
	library.pollingInterval = 12000;
	return library;
}

function Web3ConnectProvider({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			{children}
		</Web3ReactProvider>
	);
}

export default Web3ConnectProvider;

export type { Web3Provider };
