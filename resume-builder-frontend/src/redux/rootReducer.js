import {combineReducers} from "@reduxjs/toolkit"
import resumeDataSlice from "./resumeDataSlice"

export const rootReducer = combineReducers({
    resumeData : resumeDataSlice.reducer,
})