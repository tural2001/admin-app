import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import paymentService from './paymentsService';

const initialState = {
  payments: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpayments = createAsyncThunk(
  'payments/get-payments',
  async (thunkAPI) => {
    try {
      return await paymentService.getpayments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApayment = createAsyncThunk(
  'payments/get-payment',
  async (id, thunkAPI) => {
    try {
      return await paymentService.getpayment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApayment = createAsyncThunk(
  'payments/delete-payment',
  async (id, thunkAPI) => {
    try {
      return await paymentService.deletepayment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApayment = createAsyncThunk(
  'payments/create-payment',
  async (paymentData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', paymentData.active);
      formdata.append('image', paymentData.image[0], paymentData.image[0].name);
      formdata.append('name', paymentData.name);
      formdata.append('meta_title', paymentData.meta_title);
      formdata.append('meta_description', paymentData.meta_description);
      formdata.append('redirect_link', paymentData.redirect_link);
      formdata.append('description', paymentData.description);
      const response = await paymentService.createpayment(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateApayment = createAsyncThunk(
  'payments/update-payment',
  async (paymentData, thunkAPI) => {
    console.log(paymentData);
    try {
      const formdata = new FormData();
      formdata.append('active', paymentData.payment.active);
      formdata.append('name', paymentData.payment.name);
      formdata.append('meta_title', paymentData.payment.meta_title);
      formdata.append('meta_description', paymentData.payment.meta_description);
      if (paymentData.payment.image[0] instanceof File) {
        formdata.append(
          'image',
          paymentData.payment.image[0],
          paymentData.payment.image[0].name
        );
      }
      formdata.append('description', paymentData.payment.description);
      formdata.append('redirect_link', paymentData.payment.redirect_link);
      formdata.append('_method', 'PUT');

      const response = await paymentService.updatepayment(
        formdata,
        paymentData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpayments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpayments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.payments = action.payload;
      })
      .addCase(getpayments.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPayment = action.payload;
      })
      .addCase(createApayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.paymentName = action.payload.data.name;
        state.paymentMeta_title = action.payload.data.meta_title;
        state.paymentMeta_description = action.payload.data.meta_description;
        state.paymentActive = action.payload.data.active;
        state.paymentDescription = action.payload.data.description;
        state.paymentRedirect_link = action.payload.data.redirect_link;
        state.paymentImage = action.payload.data.image;
      })
      .addCase(getApayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPayment = action.payload;
      })
      .addCase(updateApayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPayment = action.payload;
      })
      .addCase(deleteApayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default paymentSlice.reducer;
