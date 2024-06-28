import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

// Function to initialize Web3Provider with the provided provider
const getLibrary = (provider: any): Web3Provider => {
  return new Web3Provider(provider);
};

// Web3ConnectProvider component wraps Web3ReactProvider and provides children
function Web3ConnectProvider({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {children}
    </Web3ReactProvider>
  );
}

export default Web3ConnectProvider;
export type { Web3Provider };
