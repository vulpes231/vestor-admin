/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, liveServer, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getAssetsLoading: false,
  getAssetsError: false,
  assets: false,
  singleAssetLoading: false,
  singleAssetError: false,
  singleAsset: false,
};

export const getAvailableAssets = createAsyncThunk(
  "asset/getAvailableAssets",
  async () => {
    try {
      const url = `${liveServer}/assets/all`;
      const token = getAccessToken();
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      sendError(error);
    }
  },
);

export const getAssetByParam = createAsyncThunk(
  "asset/getAssetByParam",
  async (formData) => {
    try {
      const url = `${liveServer}/assets/${formData}`;
      const token = getAccessToken();
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      sendError(error);
    }
  },
);

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableAssets.pending, (state) => {
        state.getAssetsLoading = true;
      })
      .addCase(getAvailableAssets.fulfilled, (state, action) => {
        state.getAssetsLoading = false;
        state.getAssetsError = false;
        state.assets = action.payload.assets;
      })
      .addCase(getAvailableAssets.rejected, (state, action) => {
        state.getAssetsLoading = false;
        state.getAssetsError = action.error.message;
        state.assets = false;
      });
    builder
      .addCase(getAssetByParam.pending, (state) => {
        state.singleAssetLoading = true;
      })
      .addCase(getAssetByParam.fulfilled, (state, action) => {
        state.singleAssetLoading = false;
        state.singleAssetError = false;
        state.singleAsset = action.payload.asset;
      })
      .addCase(getAssetByParam.rejected, (state, action) => {
        state.singleAssetLoading = false;
        state.singleAssetError = action.error.message;
        state.singleAsset = false;
      });
  },
});

export default assetSlice.reducer;
