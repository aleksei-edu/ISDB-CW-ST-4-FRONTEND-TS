import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { credentialSlice } from "./slice/CredentialSlice";
import { UserApi } from "./slice/UserApi";
import userSlice from "./slice/UserSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({
  credential: credentialSlice,
  user: userSlice,
  [UserApi.reducerPath]: UserApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
