import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginSlice";
import userReducer from "../features/userSlice";
import poolReducer from "../features/poolSlice";
import trnxReducer from "../features/trnxSlice";
import verifyReducer from "../features/verifySlice";
import ticketReducer from "../features/ticketSlice";
import assetReducer from "../features/assetSlice";
import logoutReducer from "../features/logoutSlice";

const store = configureStore({
  reducer: {
    auth: loginReducer,
    users: userReducer,
    invest: poolReducer,
    trnx: trnxReducer,
    verify: verifyReducer,
    ticket: ticketReducer,
    asset: assetReducer,
    logout: logoutReducer,
  },
});

export default store;
