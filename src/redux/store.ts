import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { authReducer } from "./slices/Auth";
import { EmployeeReducer } from "./slices/Employees";
export const store = configureStore({
  reducer: { auth: authReducer, employee: EmployeeReducer },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
