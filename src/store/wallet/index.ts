import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { RootState } from "..";

export interface WalletState {
    [key: string]: any
}

const initialState: WalletState = {
    provider: null,
    account: '',
    balance: '0',
};

export const getWalletBalance = createAsyncThunk<any, void, {state: RootState}>(
    'wallet/getWalletBalance', 
    async (_, { getState }) => {
        if (getState().wallet.provider && getState().wallet.account) {
            return await getState().wallet.provider.getBalance(getState().wallet.account)
        }
        return null
    }
)

export const handleConnectWallet = createAsyncThunk(
    'wallet/handleConnectWallet',
    async () => {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        return accounts[0]
    }
)

const slice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setWalletState: (state, action: PayloadAction<WalletState>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        },
        handleDisconnect: (state) => {
            state.account = '';
            state.balance = '0';
        }
    },
    extraReducers: builder => {
        builder.addCase(getWalletBalance.fulfilled, (state, action) => {
            state.balance = ethers.utils.formatEther(action.payload)
        }),
        builder.addCase(handleConnectWallet.fulfilled, (state, action) => {
            state.account = action.payload
        })
    },
});

export const {
    setWalletState,
    handleDisconnect,
} = slice.actions;

export default slice.reducer;
