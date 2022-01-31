import { ethers } from "ethers";
import {
    Container,
    Button,
} from "react-bootstrap";

import { useEffect, useState } from "react"
import useWallet from "../hooks/useWallet";

export default function Contract() {

    const { provider, account, balance, handleConnect, handleDisconnect } = useWallet();
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        if (provider) {
            const toConnect = new ethers.Contract(
                import.meta.env.VITE_SMARTCONTRACT_ADDRESS,
                import.meta.env.VITE_SMARTCONTRACT_ABI,
                provider.getSigner()
            );
            setContract(toConnect);
        }
    }, [provider])
    
    return (
        <>
            <Container>
                <h1>{ account }</h1>
                <h1>Balance: { balance }</h1>
                <h1>{ contract && contract.address }</h1>
                <Button variant="primary" onClick={() => handleConnect()}>Connect</Button>
                <Button variant="warning" onClick={() => handleDisconnect()}>Disconnect</Button>
            </Container>
        </>
    )
}
