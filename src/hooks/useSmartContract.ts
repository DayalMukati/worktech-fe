import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import useMetamask from './useMetamask';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/sc-constants';

const useSmartContract = (web3: any) => {
  const { account, connectToMetamask } = useMetamask();
  const [contract, setContract] = useState<any>(null);

  useEffect(() => {
      console.log('web3....',web3,CONTRACT_ADDRESS, CONTRACT_ABI)
    if (web3 && CONTRACT_ADDRESS && CONTRACT_ABI) {
      const contractInstance = new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);
      console.log('contractInstance++++', contractInstance)
      setContract(contractInstance);
    }
  }, [web3]);

  const callMethod = async (methodName: string, ...args: any[]) => {
    
    // if (!contract) {
    //   throw new Error('Contract not initialized');
    // }
    const contractInstance = new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);


    return contract.methods[methodName](...args).send({ from: account });
  };

  return { callMethod, connectToMetamask, account };
};

export default useSmartContract;
