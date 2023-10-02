import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import paymentService from './paymentsService';
import { language } from '../../Language/languages';

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
      formdata.append('active', paymentData.values.active);
      formdata.append(
        'image',
        paymentData?.values.image[0],
        paymentData?.values.image[0].name
      );
      formdata.append('name', paymentData.values.name);
      formdata.append('meta_title', paymentData.values.meta_title);
      formdata.append('meta_description', paymentData.values.meta_description);
      formdata.append('redirect_link', paymentData.values.redirect_link);
      formdata.append('description', paymentData.values.description);
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
      formdata.append('active', paymentData.paymentData.active);
      formdata.append('name', paymentData.paymentData.name);
      formdata.append('meta_title', paymentData.paymentData.meta_title);
      formdata.append(
        'meta_description',
        paymentData.paymentData.meta_description
      );
      if (paymentData.paymentData.image[0] instanceof File) {
        formdata.append(
          'image',
          paymentData.paymentData.image[0],
          paymentData.paymentData.image[0].name
        );
      }
      formdata.append('description', paymentData.paymentData.description);
      formdata.append('redirect_link', paymentData.paymentData.redirect_link);
      formdata.append('_method', 'PUT');

      const response = await paymentService.updatepayment(
        formdata,
        paymentData.id,
        paymentData
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
        state.PaymentData = action.payload;
        state.paymentActive = action.payload[language[0]].data.active;
        state.paymentRedirect_link =
          action.payload[language[0]].data.redirect_link;
        state.paymentImage = action.payload[language[0]].data.image;
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
