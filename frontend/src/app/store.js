import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import refundReducer from "../features/refund/refundSlice.js";
import noteReducer from "../features/note/noteSlice.js";
import userReducer from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    refund: refundReducer,
    note: noteReducer,
    user: userReducer,
  },
});
