import { useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';

const useMetamask = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [signedMessage, setSignedMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  const targetChainId = '0x128'; // Replace with your target chain ID

  const switchChain = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: targetChainId }],
        });
        setChainId(targetChainId);
      } catch (switchError) {
        setError('Failed to switch chain');
      }
    }
  };

  const signMessage = async (web3Instance: Web3, account: string): Promise<string> => {
    const message = 'Worktech Sign In';
    const signedMessage = await web3Instance.eth.personal.sign(message, account, '');
    return signedMessage;
  };

  const connectToMetamask = useCallback(async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum as any);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWeb3(web3Instance);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        if (chainId !== targetChainId) {
          await switchChain();
        }
        const accounts = await web3Instance.eth.getAccounts();
        const account = accounts[0];
        setAccount(account);
        const signedMessage = await signMessage(web3Instance, account);
        setSignedMessage(signedMessage);
        return { account, signedMessage, web3Instance};
      } catch (error) {
        setError('User denied account access');
        return { account: '', signedMessage: '' };
      }
    } else {
      setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return { account: '', signedMessage: '' };
    }
  }, []);

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount('');
      }
    };

    const handleChainChanged = (chainId: string) => {
      setChainId(chainId);
      if (chainId !== targetChainId) {
        switchChain();
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  return { web3, account, signedMessage, error, connectToMetamask };
};

export default useMetamask;
