import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import refundService from "./refundService";

const initialState = {
  refunds: [],
  refund: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createRefund = createAsyncThunk(
  "refunds/create",
  async (refundData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await refundService.createRefund(refundData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRefunds = createAsyncThunk(
  "refunds/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await refundService.getRefunds(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRefund = createAsyncThunk("refund/", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await refundService.getRefund(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const closeRefund = createAsyncThunk(
  "refund/close",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await refundService.closeRefund(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refundSlice = createSlice({
  name: "refund",
  initialState,
  reducers: {
    reset: (state) => {
      state.refund = {};
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      // return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRefund.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(createRefund.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRefunds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRefunds.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.refunds = action.payload;
      })
      .addCase(getRefunds.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRefund.fulfilled, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.refund = action.payload;
      })
      .addCase(getRefund.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeRefund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.refund.refunds.map((refund) =>
          refund._id === action.payload._id
            ? (refund.status = "refunded")
            : refund
        );
      });
  },
});

export const { reset } = refundSlice.actions;
export default refundSlice.reducer;
