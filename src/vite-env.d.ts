/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_RPC: string
    readonly VITE_CHAIN_ID: string
    readonly VITE_SMARTCONTRACT_ABI: Array<any>
    readonly VITE_SMARTCONTRACT_ADDRESS: string
    // more env variables...
}

interface Window {
    ethereum: any
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv
}
