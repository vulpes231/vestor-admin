import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken, sendError } from "../constants";
import axios from "axios";

const initialState = {
  getTicketError: false,
  getTicketLoading: false,
  tickets: false,
  userTicketError: false,
  userTicketLoading: false,
  userTicket: false,
  replyTicketError: false,
  replyTicketLoading: false,
  ticketReplied: false,
};

export const getAllTickets = createAsyncThunk(
  "ticket/getAllTickets",
  async () => {
    try {
      const url = `${devServer}/ticket`;
      const accessToken = getAccessToken();
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

export const getUserTicket = createAsyncThunk(
  "ticket/getUserTicket",
  async (ticketId) => {
    try {
      const url = `${devServer}/ticket/${ticketId}`;
      const accessToken = getAccessToken();
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

export const replyTicket = createAsyncThunk(
  "ticket/replyTicket",
  async (formData) => {
    try {
      const url = `${devServer}/ticket`;
      const accessToken = getAccessToken();
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

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.getTicketLoading = true;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.getTicketLoading = false;
        state.getTicketError = false;
        state.tickets = action.payload.tickets;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.getTicketLoading = false;
        state.getTicketError = action.error.message;
        state.tickets = false;
      });
    builder
      .addCase(getUserTicket.pending, (state) => {
        state.userTicketLoading = true;
      })
      .addCase(getUserTicket.fulfilled, (state, action) => {
        state.userTicketLoading = false;
        state.userTicketError = false;
        state.userTicket = action.payload.userTicket;
      })
      .addCase(getUserTicket.rejected, (state, action) => {
        state.userTicketLoading = false;
        state.userTicketError = action.error.message;
        state.userTicket = false;
      });
    builder
      .addCase(replyTicket.pending, (state) => {
        state.replyTicketLoading = true;
      })
      .addCase(replyTicket.fulfilled, (state) => {
        state.replyTicketLoading = false;
        state.replyTicketError = false;
        state.ticketReplied = true;
      })
      .addCase(replyTicket.rejected, (state, action) => {
        state.replyTicketLoading = false;
        state.replyTicketError = action.error.message;
        state.ticketReplied = false;
      });
  },
});

export default ticketSlice.reducer;
