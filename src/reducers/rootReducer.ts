import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./appReducer";
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
    appReducer,
    usersReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer