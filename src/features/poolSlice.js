import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  devServer,
  getAccessToken,
  liveServer,
  sendError,
} from "../constants/index";
import axios from "axios";

const initialState = {
  getPoolLoading: false,
  getPoolError: false,
  pools: false,
};

export const getInvestments = createAsyncThunk(
  "invest/getInvestments",
  async () => {
    const url = `${liveServer}/invest`;
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

const poolSlice = createSlice({
  name: "invest",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvestments.pending, (state) => {
        state.getPoolLoading = true;
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.getPoolLoading = false;
        state.getPoolError = false;
        state.pools = action.payload.investments;
      })
      .addCase(getInvestments.rejected, (state, action) => {
        state.getPoolLoading = false;
        state.getPoolError = action.error.message;
        state.pools = false;
      });
  },
});

export default poolSlice.reducer;
