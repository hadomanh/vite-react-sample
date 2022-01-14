import { ethers } from "ethers";
import { useState, useEffect } from "react"

const useEthers = () => {

    const [ provider, setProvider ] = useState<any>(null)
    const [ account, setAccount ] = useState<string>('')
    const [ balance, setBalance ] = useState<string>('')

    const CHAIN_ID = import.meta.env.VITE_CHAIN_ID
    const RPC_URL = import.meta.env.VITE_RPC_URL

    const getProvider = async () => {

        if (!window.ethereum?.request) {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            return;
        }
        
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider)
    }

    const switchChain = async () => {

        if (!window.ethereum?.request) {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            return;
        }
        
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params : [ { chainId: CHAIN_ID } ]
            });

        } catch (error: any) {

            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [ { chainId: CHAIN_ID, rpcUrl: RPC_URL } ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
            console.error(error);
        }
        
    }

    const connectAccount = async () => {

        if (!window.ethereum?.request) {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            return;
        }
            
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        
        setAccount(accounts[0]);
    };

    const handleConnect = async () => {
        await switchChain()
        await connectAccount()
    }

    const handleDisconnect = async () => {
        setAccount('')
        setBalance('')
    }

    useEffect(() => {
        getProvider()
    }, [])

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: any) => {
            setAccount(accounts[0]);
        });

        window.ethereum.on('chainChanged', async (_chainId: any) => {
            if (_chainId !== CHAIN_ID) {
                await switchChain();
            }
            await connectAccount()
        });

    }, [])

    useEffect(() => {
        if (provider) {
            switchChain()
            connectAccount()
        }
    }, [provider])

    useEffect(() => {
        if (provider && account) {
            provider.getBalance(account).then((_balance: any) => {
                setBalance(ethers.utils.formatEther(_balance))
            });
        }
    }, [provider, account])

    return { provider, account, balance, handleConnect, handleDisconnect }
}

export default useEthers
export { useEthers }
