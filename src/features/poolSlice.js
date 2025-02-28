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
  userBotsLoading: false,
  userBotsError: false,
  userBots: false,
  createTradeLoading: false,
  createTradeError: false,
  tradeCreated: false,
};

export const getInvestments = createAsyncThunk(
  "invest/getInvestments",
  async () => {
    const url = `${liveServer}/managetrade`;
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

export const getUserBots = createAsyncThunk(
  "invest/getUserBots",
  async (userId) => {
    const url = `${liveServer}/managepool/${userId}`;
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

export const createTrade = createAsyncThunk(
  "invest/createTrade",
  async (formData) => {
    const url = `${liveServer}/managetrade`;
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
        state.pools = action.payload.trades;
      })
      .addCase(getInvestments.rejected, (state, action) => {
        state.getPoolLoading = false;
        state.getPoolError = action.error.message;
        state.pools = false;
      });
    builder
      .addCase(getUserBots.pending, (state) => {
        state.userBotsLoading = true;
      })
      .addCase(getUserBots.fulfilled, (state, action) => {
        state.userBotsLoading = false;
        state.userBotsError = false;
        state.userBots = action.payload.userBots;
      })
      .addCase(getUserBots.rejected, (state, action) => {
        state.userBotsLoading = false;
        state.userBotsError = action.error.message;
        state.userBots = false;
      });
    builder
      .addCase(createTrade.pending, (state) => {
        state.createTradeLoading = true;
      })
      .addCase(createTrade.fulfilled, (state) => {
        state.createTradeLoading = false;
        state.createTradeError = false;
        state.tradeCreated = true;
      })
      .addCase(createTrade.rejected, (state, action) => {
        state.createTradeLoading = false;
        state.createTradeError = action.error.message;
        state.tradeCreated = false;
      });
  },
});

export default poolSlice.reducer;
