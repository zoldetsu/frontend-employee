import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

interface ILoginParams {
  email: string;
  password: string;
}

interface IRegisterParams {
  name: string;
  email: string;
  password: string;
}

const initialState = {
  data: null,
  status: "loading",
};

export const fetchAuth = createAsyncThunk(
  "/login/fetchAuth",
  async (params: ILoginParams) => {
    const { data } = await axios.post("/api/user/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "/register/fetchRegister",
  async (params: IRegisterParams) => {
    const { data } = await axios.post("/api/user/register", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("/auth/fetchAuthMe", async () => {
  const { data } = await axios.get("api/user/me");
  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });

    builder.addCase(fetchAuth.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });

    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.status = "loading";
      state.data = null;
    });

    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    });

    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.data = null;
      state.status = "error";
    });
  },
});

export const selectIsAuth = (state: { auth: { data: IRegisterParams } }) =>
  Boolean(state.auth.data);

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
