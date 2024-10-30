import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

interface IAdd {
  firstName: string;
  lastName: string;
  address: string;
  age: string;
}

const initialState = {
  oneEmployee: {
    status: "loading",
    data: null,
  },
  allEmployees: {
    status: "loading",
    data: [],
  },
};

export const fetchAddEmployee = createAsyncThunk(
  "add/fetchAddEmployee",
  async (params: IAdd) => {
    const { data } = await axios.post("/api/employees/add", params);
    return data;
  }
);

export const fetchGetAll = createAsyncThunk("home/fetchGetAll", async () => {
  const { data } = await axios.get("/api/employees/home");
  return data;
});

export const fetchDelete = createAsyncThunk(
  "remove/fetchDelete",
  async (id: string) => {
    await axios.delete(`/api/employees/remove/${id}`);
  }
);

const EmployeeSlice = createSlice({
  name: "Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddEmployee.pending, (state) => {
      state.oneEmployee.status = "loading";
      state.oneEmployee.data = null;
    });

    builder.addCase(fetchAddEmployee.fulfilled, (state, action) => {
      state.oneEmployee.data = action.payload;
      state.oneEmployee.status = "loading";
    });

    builder.addCase(fetchAddEmployee.rejected, (state ) => {
      state.oneEmployee.data = null;
      state.oneEmployee.status = "error";
    });
    builder.addCase(fetchGetAll.pending, (state) => {
      state.allEmployees.status = "loading";
      state.allEmployees.data = [];
    });
    builder.addCase(fetchGetAll.fulfilled, (state, action) => {
      state.allEmployees.status = "loading";
      state.allEmployees.data = action.payload;
    });
    builder.addCase(fetchGetAll.rejected, (state) => {
      state.allEmployees.status = "error";
      state.allEmployees.data = [];
    });
  },
});

export const EmployeeReducer = EmployeeSlice.reducer;
