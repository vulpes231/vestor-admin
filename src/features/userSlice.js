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
};

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const url = `${liveServer}/usercontrol`;
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
    const url = `${liveServer}/usercontrol/${userId}`;
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

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
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
  },
});

export default userSlice.reducer;
