import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getTrnxLoading: false,
  getTrnxError: false,
  trnxs: false,
  singleTrnxLoading: false,
  singleTrnxError: false,
  singleTrnx: false,
  approveTrnxLoading: false,
  approveTrnxError: false,
  trnxApproved: false,
};

export const getAllTrnx = createAsyncThunk("trnx/getTrnxs", async () => {
  const url = `${liveServer}/trnxs`;
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
});

export const getTrnxById = createAsyncThunk(
  "trnx/getTrnxById",
  async (transactionId) => {
    const url = `${liveServer}/trnxs/${transactionId}`;
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
    }
  }
);

export const approveTrnx = createAsyncThunk(
  "trnx/approveTrnx",
  async (transactionId) => {
    const url = `${liveServer}/trnxs/${transactionId}`;
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  }
);

const trnxSlice = createSlice({
  name: "trnx",
  initialState,
  reducers: {
    resetApprove(state) {
      state.approveTrnxError = false;
      state.approveTrnxLoading = false;
      state.trnxApproved = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrnx.pending, (state) => {
        state.getTrnxLoading = true;
      })
      .addCase(getAllTrnx.fulfilled, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = false;
        state.trnxs = action?.payload?.transactions;
      })
      .addCase(getAllTrnx.rejected, (state, action) => {
        state.getTrnxLoading = false;
        state.getTrnxError = action.error.message;
        state.trnxs = false;
      });

    builder
      .addCase(getTrnxById.pending, (state) => {
        state.singleTrnxLoading = true;
      })
      .addCase(getTrnxById.fulfilled, (state, action) => {
        state.singleTrnxLoading = false;
        state.singleTrnxError = false;
        state.singleTrnx = action.payload.trnx;
      })
      .addCase(getTrnxById.rejected, (state, action) => {
        state.singleTrnxLoading = false;
        state.singleTrnxError = action.error.message;
        state.singleTrnx = false;
      });

    builder
      .addCase(approveTrnx.pending, (state) => {
        state.approveTrnxLoading = true;
      })
      .addCase(approveTrnx.fulfilled, (state) => {
        state.approveTrnxLoading = false;
        state.approveTrnxError = false;
        state.trnxApproved = true;
      })
      .addCase(approveTrnx.rejected, (state, action) => {
        state.approveTrnxLoading = false;
        state.approveTrnxError = action.error.message;
        state.trnxApproved = false;
      });
  },
});

export const { resetApprove } = trnxSlice.reducer;
export default trnxSlice.reducer;
