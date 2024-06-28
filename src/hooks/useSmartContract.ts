// useSmartContract.ts
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import useWeb3 from './useWeb3';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../lib/sc-constants';
import getWeb3NoAccount from '../lib/getWeb3NoAccount';

interface UseSmartContract {
  callMethod: (methodName: string, ...args: any[]) => Promise<any>;
  account: string | null | undefined;
}


const useSmartContract = (): UseSmartContract => {
  let account;
  // const { library, account } = useWeb3();
  // const [contract, setContract] = useState<Web3.eth.Contract | null>(null);
  console.log('account++++++', getWeb3NoAccount())
  // useEffect(() => {
  //   if (library && CONTRACT_ADDRESS && CONTRACT_ABI) {
  //     let libraryProvider: any = library.provider? library.provider: getWeb3NoAccount()
  //     const web3Instance = new Web3(libraryProvider);
  //     const contractInstance = new web3Instance.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);
  //     setContract(contractInstance);
  //   }
  // }, [library]);

  const callMethod = async (methodName: string, args: any[]): Promise<any> => {

    // const web3 = new Web3('https://testnet.hashio.io/api');
    const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.hashio.io/api'));

    const contract = new web3.eth.Contract(CONTRACT_ABI as AbiItem[], CONTRACT_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const storedWalletAddress = localStorage.getItem('address') as string;

    account = accounts[0]
    // const receipt = await contract.methods.setValue(newValue).send({ from: accounts[0] });

    console.log('+++++methodName', methodName, args, accounts, storedWalletAddress)
    const receipt = await contract.methods.createTask(...args).send({ from: storedWalletAddress });
    console.log('receipt+++++', receipt)
    return receipt;

  };

  return { callMethod, account };
};

export default useSmartContract;
