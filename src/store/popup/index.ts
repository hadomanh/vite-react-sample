import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PopupState {
    content?: string,
    backgroundColor?: string,
    textColor?: string,
    [key: string]: any
}

const initialState: PopupState = {
    content: 'Nothing more',
    backgroundColor: '#000000',
    textColor: '#ffffff',
};

const slice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setPopupState: (state, action: PayloadAction<PopupState>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }
        }
    },
});

export const { setPopupState } = slice.actions;

export default slice.reducer;
