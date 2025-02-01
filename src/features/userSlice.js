/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/index";
import axios from "axios";

const initialState = {
  usersLoading: false,
  usersError: false,
  users: false,
  userInfoLoading: false,
  userInfoError: false,
  userInfo: false,
  setWalletLoading: false,
  setWalletError: false,
  setWalletSuccess: false,
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const url = `${liveServer}/manageadmin/users`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
    throw error;
  }
});

export const getUserInfo = createAsyncThunk(
  "users/getUserInfo",
  async (userId) => {
    const url = `${liveServer}/manageadmin/${userId}`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
      throw error;
    }
  }
);

export const setUserWallet = createAsyncThunk(
  "users/setUserWallet",
  async (formData) => {
    const url = `${devServer}/manageadmin/users`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetWallet(state) {
      state.setWalletLoading = false;
      state.setWalletError = false;
      state.setWalletSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersError = false;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.error.message;
        state.users = false;
      });

    builder
      .addCase(getUserInfo.pending, (state) => {
        state.userInfoLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfoLoading = false;
        state.userInfoError = false;
        state.userInfo = action.payload.userInfo;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.userInfoLoading = false;
        state.userInfoError = action.error.message;
        state.userInfo = false;
      });
    builder
      .addCase(setUserWallet.pending, (state) => {
        state.setWalletLoading = true;
      })
      .addCase(setUserWallet.fulfilled, (state) => {
        state.setWalletLoading = false;
        state.setWalletError = false;
        state.setWalletSuccess = true;
      })
      .addCase(setUserWallet.rejected, (state, action) => {
        state.setWalletLoading = false;
        state.setWalletError = action.error.message;
        state.setWalletSuccess = false;
      });
  },
});

export const { resetWallet } = userSlice.actions;
export default userSlice.reducer;
