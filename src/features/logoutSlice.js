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
  logoutLoading: false,
  logoutError: false,
  loggedOut: false,
};

export const logoutAdmin = createAsyncThunk(
  "logout/logoutAdmin",
  async (_, { rejectWithValue }) => {
    const url = `${liveServer}/logoutadmin`;

    try {
      const token = getAccessToken();

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      if (response.data.success) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        sessionStorage.clear();
      }

      return response.data;
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data?.message ||
          error.response.data?.error ||
          "Logout failed";

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");

        return rejectWithValue(errorMessage);
      } else if (error.request) {
        return rejectWithValue("Network error - unable to reach server");
      } else {
        return rejectWithValue(
          error.message || "An error occurred during logout",
        );
      }
    }
  },
);

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  reducers: {
    resetLogout(state) {
      state.logoutLoading = false;
      state.logoutError = false;
      state.loggedOut = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAdmin.pending, (state) => {
        state.logoutLoading = true;
      })
      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = false;
        state.loggedOut = true;
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.error.message;
        state.loggedOut = false;
      });
  },
});

export const { resetLogout } = logoutSlice.actions;
export default logoutSlice.reducer;
