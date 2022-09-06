import { configureStore, Action, ThunkAction} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import type { PreloadedState } from '@reduxjs/toolkit'
import rootReducer from '../reducers/rootReducer';

const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
      reducer: rootReducer,
      preloadedState
    })
  }


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch();
export type AppThunk = ThunkAction <void, RootState, unknown, Action >

// export type AppStore = ReturnType<typeof store>

// export type AppDispatch = typeof store.dispatch;



export default setupStore