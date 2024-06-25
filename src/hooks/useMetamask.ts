import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useMetamask = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const targetChainId = '0x128'; // Replace with your target chain ID (e.g., 0x2a for Kovan testnet)

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum as any); // Add 'as any' here
        setWeb3(web3Instance);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        if (chainId !== targetChainId) {
          await switchChain();
        }
        setIsConnected(true);
      } catch (error) {
        setError('User denied account access');
      }
    } else {
      setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

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

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum as any); // Add 'as any' here
        setWeb3(web3Instance);
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(chainId);
        if (chainId !== targetChainId) {
          await switchChain();
        }
      } else {
        setError('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };

    // Don't load Metamask automatically on component mount
    // Load it when connectMetamask is called
    if (isConnected) {
      loadWeb3();
    }
  }, [isConnected]);

  useEffect(() => {
    const fetchAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0] || '');
      }
    };

    fetchAccount();
  }, [web3]);

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

    if (web3 && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (web3 && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [web3]);

  const signMessage = async (message: string): Promise<string> => {
    if (!web3) throw new Error('Web3 not initialized');
    const signedMessage = await web3.eth.personal.sign(message, account, '');
    return signedMessage;
  };

  return { web3, account, error, signMessage, chainId, connectMetamask, isConnected };
};

export default useMetamask;
