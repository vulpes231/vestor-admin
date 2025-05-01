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
  disableLoading: false,
  disableError: false,
  disableSuccess: false,
  enableLoading: false,
  enableError: false,
  enableSuccess: false,
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
    const url = `${liveServer}/manageadmin/users`;
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

export const disableWithdraw = createAsyncThunk(
  "users/disableWithdraw",
  async (formData) => {
    const url = `${liveServer}/manageadmin/setwithdraw`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(url, formData, {
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

export const enableWithdraw = createAsyncThunk(
  "users/enableWithdraw",
  async (userId) => {
    const url = `${liveServer}/manageadmin/setwithdraw`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.put(url, userId, {
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
    resetDisableWithdraw(state) {
      state.disableError = false;
      state.disableLoading = false;
      state.disableSuccess = false;
    },
    resetEnableWithdraw(state) {
      state.enableError = false;
      state.enableLoading = false;
      state.enableSuccess = false;
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
    builder
      .addCase(disableWithdraw.pending, (state) => {
        state.disableLoading = true;
      })
      .addCase(disableWithdraw.fulfilled, (state) => {
        state.disableLoading = false;
        state.disableError = false;
        state.disableSuccess = true;
      })
      .addCase(disableWithdraw.rejected, (state, action) => {
        state.disableLoading = false;
        state.disableError = action.error.message;
        state.disableSuccess = false;
      });
    builder
      .addCase(enableWithdraw.pending, (state) => {
        state.enableLoading = true;
      })
      .addCase(enableWithdraw.fulfilled, (state) => {
        state.enableLoading = false;
        state.enableError = false;
        state.enableSuccess = true;
      })
      .addCase(enableWithdraw.rejected, (state, action) => {
        state.enableLoading = false;
        state.enableError = action.error.message;
        state.enableSuccess = false;
      });
  },
});

export const { resetWallet, resetDisableWithdraw, resetEnableWithdraw } =
  userSlice.actions;

export default userSlice.reducer;
