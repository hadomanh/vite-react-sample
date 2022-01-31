import { ethers } from "ethers";
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { setWalletState } from "../store/wallet";

const useWallet = () => {

    const [ provider, setProvider ] = useState<any>(null)
    const [ account, setAccount ] = useState<string>('')
    const [ balance, setBalance ] = useState<string>('0')

    const CHAIN_ID = import.meta.env.VITE_CHAIN_ID
    const RPC_URL = import.meta.env.VITE_RPC_URL
    const dispatch = useDispatch()

    const updateProvider = (_provider: any) => {
        dispatch(
            setWalletState({
                provider: _provider,
            })
        )
    }

    const updateAccount = (_account: any) => {
        dispatch(
            setWalletState({
                account: _account,
            })
        )
    }

    const updateBalance = (_balance: any) => {
        dispatch(
            setWalletState({
                balance: _balance,
            })
        )
    }

    const getProvider = async () => {

        if (!window.ethereum?.request) {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
            return;
        }
        
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider)
        updateProvider(newProvider)
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
        updateAccount(accounts[0]);
    };

    const handleConnect = async () => {
        await switchChain()
        await connectAccount()
    }

    const handleDisconnect = async () => {
        setAccount('')
        setBalance('0')

        updateAccount('')
        updateBalance('0')
    }

    const getContract = async (address: string, abi: any) => {
            
        if (provider) {
            return new ethers.Contract(
                address,
                abi,
                provider.getSigner()
            );
        }

        return null
    }

    useEffect(() => {
        getProvider()
    }, [])

    useEffect(() => {
        window.ethereum.on('accountsChanged', (accounts: any) => {
            setAccount(accounts[0]);
            updateAccount(accounts[0]);
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
                updateBalance(ethers.utils.formatEther(_balance))
            });
        }
    }, [provider, account])

    return {
        provider,
        account,
        balance,
        handleConnect,
        handleDisconnect,
        getContract,
    }
}

export default useWallet
export { useWallet }
