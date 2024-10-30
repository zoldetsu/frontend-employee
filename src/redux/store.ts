import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

import { authReducer } from "./slices/Auth";
import { EmployeeReducer } from "./slices/Employees";
export const store = configureStore({
  reducer: { auth: authReducer, employee: EmployeeReducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
