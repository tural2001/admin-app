import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import paymentformService from './paymentformDataService';

const initialState = {
  paymentformdatas: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpaymentformdatas = createAsyncThunk(
  'paymentformdatas/get-paymentformdatas',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.getpaymentformdatas(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApaymentformdata = createAsyncThunk(
  'paymentformdatas/get-paymentformdata',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.getpaymentformdata(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApaymentformdata = createAsyncThunk(
  'paymentformdatas/delete-paymentformdata',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.deletepaymentformdata(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const paymentformdataSlice = createSlice({
  name: 'paymentformdatas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpaymentformdatas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpaymentformdatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.paymentformdatas = action.payload;
      })
      .addCase(getpaymentformdatas.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getApaymentformdata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApaymentformdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.paymentformdataLabel = action.payload.label;
        state.paymentformdataRules = action.payload.rules;
        state.paymentformdatadata = action.payload.data;
        state.paymentformdataName = action.payload.name;
        state.paymentformdataType = action.payload.type;
      })
      .addCase(getApaymentformdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(deleteApaymentformdata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApaymentformdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedpaymentformdata = action.payload;
      })
      .addCase(deleteApaymentformdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default paymentformdataSlice.reducer;
