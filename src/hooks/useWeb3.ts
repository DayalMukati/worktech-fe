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
  createTask: (args: any[]) => Promise<any>;
  submitTask: (args: any[]) => Promise<any>;
  completeTask: (args: any[]) => Promise<any>;
  getTaskData: (args: any)=>Promise<any>;
}

const injected = new InjectedConnector({
  supportedChainIds: [296], // Specify the chain IDs MetaMask should be connected to
});

const useWeb3 = (): UseWeb3 => {
  const { activate, active, account, library } = useWeb3React<Web3Provider>();

  const [web3Instance, setWeb3Instance] = useState<Web3 | null>(null);

  useEffect(() => {
      const web3 = library? new Web3(library.provider): getWeb3NoAccount();
      setWeb3Instance(web3);

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


  const getTaskData = async (args: any): Promise<any> => {
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
      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }

      const contract = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);

      const taskData = await contract.methods.tasks(...args).call();
      console.log('taskData+++++', taskData)
      return taskData;
    } catch (error) {
      console.error('Error calling smart contract method:', error);
      throw error;
    }
  };


  const createTask = async (args: any): Promise<any> => {
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
      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }

      const contract = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);

      const receipt = await contract.methods.createTask(...args).send({ from: account });
      return receipt;
    } catch (error) {
      console.error('Error calling smart contract method:', error);
      throw error;
    }
  };


  const submitTask = async (args: any): Promise<any> => {
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
      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }

      const contract = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);

      const receipt = await contract.methods.submitTask(...args).send({ from: account });
      return receipt;
    } catch (error) {
      console.error('Error calling smart contract method:', error);
      throw error;
    }
  };


  const completeTask = async (args: any): Promise<any> => {
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
      const account = accounts[0];
      if (!account) {
        throw new Error('No account found');
      }

      const contract = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);

      const receipt = await contract.methods.completeTask(args[0]).send({ from: account, value: args[1] });
      return receipt;
    } catch (error) {
      console.error('Error calling smart contract method:', error);
      throw error;
    }
  };

  return { connectToMetaMask, active, account, library, signMessage, createTask, submitTask, completeTask, getTaskData };
};

export default useWeb3;
