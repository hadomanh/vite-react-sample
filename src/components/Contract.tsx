import { ethers } from "ethers";
import {
    Container,
    Button,
} from "react-bootstrap";

import { useEffect, useState } from "react"
import useWallet from "../hooks/useWallet";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { getWalletBalance, handleConnectWallet, handleDisconnect } from "../store/wallet";

export default function Contract() {

    const wallet = useSelector((state: RootState) => state.wallet);
    const dispatch = useDispatch();
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        if (wallet.provider) {
            const toConnect = new ethers.Contract(
                import.meta.env.VITE_SMARTCONTRACT_ADDRESS,
                import.meta.env.VITE_SMARTCONTRACT_ABI,
                wallet.provider.getSigner()
            );
            setContract(toConnect);
        }
    }, [wallet.provider])
    
    return (
        <>
            <Container>
                <h1>{ wallet.account }</h1>
                <h1>Balance: { wallet.balance }</h1>
                <h1>{ contract && contract.address }</h1>
                <Button variant="primary" onClick={() => dispatch(handleConnectWallet())}>Connect</Button>
                <Button variant="warning" onClick={() => dispatch(handleDisconnect())}>Disconnect</Button>
                <Button variant="secondary" onClick={() => dispatch(getWalletBalance())}>Reload balance</Button>
            </Container>
        </>
    )
}
