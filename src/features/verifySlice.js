/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getInfoLoading: false,
  getInfoError: false,
  verifyInfo: false,
  verifyUserLoading: false,
  verifyUserError: false,
  userVerified: false,
};

export const verifyUser = createAsyncThunk(
  "verify/verifyUser",
  async (formData) => {
    console.log(formData);
    const url = `${liveServer}/manageverify`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

export const getVerifyInfo = createAsyncThunk(
  "verify/getVerifyInfo",
  async (userId) => {
    const url = `${liveServer}/manageverify/${userId}`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    resetVerify(state) {
      state.verifyInfo = false;
      state.verifyUserError = false;
      state.verifyUserLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVerifyInfo.pending, (state) => {
        state.getInfoLoading = true;
      })
      .addCase(getVerifyInfo.fulfilled, (state, action) => {
        state.getInfoLoading = false;
        state.getInfoError = false;
        state.verifyInfo = action.payload.verifyRequest;
      })
      .addCase(getVerifyInfo.rejected, (state, action) => {
        state.getInfoLoading = false;
        state.getInfoError = action.error.message;
        state.verifyInfo = false;
      });
    builder
      .addCase(verifyUser.pending, (state) => {
        state.verifyUserLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state) => {
        state.verifyUserLoading = false;
        state.verifyUserError = false;
        state.userVerified = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.verifyUserLoading = false;
        state.verifyUserError = action.error.message;
        state.userVerified = false;
      });
  },
});

export const { resetVerify } = verifySlice.actions;

export default verifySlice.reducer;
