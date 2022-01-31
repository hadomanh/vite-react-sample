import { configureStore } from '@reduxjs/toolkit'
import popupReducer from './popup'
import walletReducer from './wallet'

export const store = configureStore({
  reducer: {
    popup: popupReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
