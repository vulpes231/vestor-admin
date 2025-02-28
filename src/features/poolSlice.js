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
  getTradeLoading: false,
  getTradeError: false,
  trade: false,
  userBotsLoading: false,
  userBotsError: false,
  userBots: false,
  createTradeLoading: false,
  createTradeError: false,
  tradeCreated: false,
  editTradeLoading: false,
  editTradeError: false,
  tradeEdited: false,
};

export const getInvestments = createAsyncThunk(
  "invest/getInvestments",
  async () => {
    const url = `${devServer}/managetrade`;
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
    const url = `${devServer}/managepool/${userId}`;
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

export const getTrade = createAsyncThunk("invest/getTrade", async (tradeId) => {
  const url = `${devServer}/managetrade/${tradeId}`;
  const accessToken = getAccessToken();
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    sendError(error);
    throw error;
  }
});

export const createTrade = createAsyncThunk(
  "invest/createTrade",
  async (formData) => {
    const url = `${devServer}/managetrade`;
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

export const editTrade = createAsyncThunk(
  "invest/editTrade",
  async (formData) => {
    const url = `${devServer}/managetrade`;
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

const poolSlice = createSlice({
  name: "invest",
  initialState,
  reducers: {
    resetCreateTrade(state) {
      state.createTradeLoading = false;
      state.createTradeError = false;
      state.tradeCreated = false;
    },
    resetEditTrade(state) {
      state.editTradeLoading = false;
      state.editTradeError = false;
      state.tradeEdited = false;
    },
  },
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
    builder
      .addCase(getTrade.pending, (state) => {
        state.getTradeLoading = true;
      })
      .addCase(getTrade.fulfilled, (state, action) => {
        state.getTradeLoading = false;
        state.getTradeError = false;
        state.trade = action.payload.trade;
      })
      .addCase(getTrade.rejected, (state, action) => {
        state.getTradeLoading = false;
        state.getTradeError = action.error.message;
        state.trade = false;
      });
    builder
      .addCase(editTrade.pending, (state) => {
        state.editTradeLoading = true;
      })
      .addCase(editTrade.fulfilled, (state) => {
        state.editTradeLoading = false;
        state.editTradeError = false;
        state.tradeEdited = true;
      })
      .addCase(editTrade.rejected, (state, action) => {
        state.editTradeLoading = false;
        state.editTradeError = action.error.message;
        state.tradeEdited = false;
      });
  },
});

export const { resetCreateTrade, resetEditTrade } = poolSlice.actions;

export default poolSlice.reducer;
