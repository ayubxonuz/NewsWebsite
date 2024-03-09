import {configureStore} from "@reduxjs/toolkit"
import dataSlice from "./dataSlice"
import {useDispatch} from "react-redux"

export const store = configureStore({
  reducer: {dataSlice},
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
