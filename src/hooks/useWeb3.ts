import { useEffect, useState } from 'react';
import Web3, { AbiItem } from 'web3';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import getWeb3NoAccount from '../lib/getWeb3NoAccount';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/lib/sc-constants';

interface UseWeb3 {
  connectToMetaMask: () => Promise<void>;
  active: boolean;
  account: string | null | undefined;
  library: Web3Provider | undefined;
  signMessage: (message: string) => Promise<string | null>;
  callSCMethod: (method: string, args: any[]) => Promise<any>;
}

const injected = new InjectedConnector({
  supportedChainIds: [296], // Specify the chain IDs MetaMask should be connected to
});

const useWeb3 = (): UseWeb3 => {
  const { activate, active, account, library } = useWeb3React<Web3Provider>();

  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

  useEffect(() => {
    if (library) {
      const web3 = new Web3(library.provider);
      setWeb3Instance(web3);
    } else {
      const web3 = getWeb3NoAccount();
      setWeb3Instance(web3);
    }
  }, [library]);

  const connectToMetaMask = async (): Promise<void> => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Failed to connect to MetaMask', error);
    }
  };

  const signMessage = async (message: string): Promise<string | null> => {
    if (!web3Instance) {
      console.error('Web3 instance not initialized');
      return null;
    }

    try {
      const accounts = await web3Instance.eth.getAccounts();
      const account = accounts[0];
      if (!account) {
        console.error('No account found');
        return null;
      }
      const signature = await web3Instance.eth.personal.sign(message, account, '');
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  };

  const callSCMethod = async (method: string, args: any[]): Promise<any> => {
    try {
      if (!web3Instance) {
        const web3 = library ? new Web3(library.provider) : getWeb3NoAccount();
        setWeb3Instance(web3);
        console.warn('Web3 instance was not initialized, initializing now');
      }

      if (!web3Instance) {
        throw new Error('Failed to initialize Web3 instance');
      }

      const accounts = await web3Instance.eth.getAccounts();
      console.log('accounts+++++', accounts);
      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }

      const contract = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);

      const receipt = await contract.methods[method](...args).send({ from: account });
      return receipt;
    } catch (error) {
      console.error('Error calling smart contract method:', error);
      throw error;
    }
  };

  return { connectToMetaMask, active, account, library, signMessage, callSCMethod };
};

export default useWeb3;
