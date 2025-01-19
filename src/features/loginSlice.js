import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, liveServer, sendError } from "../constants/index";
import axios from "axios";

const initialState = {
  loginLoading: false,
  loginError: false,
  accessToken: false,
};

export const auth = createAsyncThunk("login/auth", async (formData) => {
  const url = `${liveServer}/adminauth`;
  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
    throw error;
  }
});

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLogin(state) {
      state.loginLoading = false;
      state.loginError = false;
      state.accessToken = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = false;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(auth.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message;
        state.accessToken = false;
      });
  },
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
