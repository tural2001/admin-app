import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { language } from '../../Language/languages';
import paymentformService from './paymentformService';

const initialState = {
  paymentfields: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpaymentfields = createAsyncThunk(
  'paymentfields/get-paymentfields',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.getpaymentfields(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApaymentfield = createAsyncThunk(
  'paymentfields/get-paymentfield',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.getpaymentfield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApaymentfield = createAsyncThunk(
  'paymentfields/delete-paymentfield',
  async (id, thunkAPI) => {
    try {
      return await paymentformService.deletepaymentfield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApaymentfield = createAsyncThunk(
  'paymentfields/create-paymentfield',
  async (paymentfieldData, thunkAPI) => {
    console.log(paymentfieldData);
    try {
      const formdata = new FormData();
      formdata.append('label', paymentfieldData.values.label);
      formdata.append('name', paymentfieldData.values.name);
      formdata.append('type', paymentfieldData.values.type);
      formdata.append('data', paymentfieldData.values.data);
      formdata.append('required', paymentfieldData.values.required);
      const response = await paymentformService.createpaymentfield(formdata);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateApaymentfield = createAsyncThunk(
  'paymentfields/update-paymentfield',
  async (paymentfieldData, thunkAPI) => {
    console.log(paymentfieldData);
    try {
      const formdata = new FormData();
      formdata.append('label', paymentfieldData.paymentfieldData.label);
      formdata.append('name', paymentfieldData.paymentfieldData.name);
      formdata.append('required', paymentfieldData.paymentfieldData.required);
      formdata.append('data', paymentfieldData.paymentfieldData.data);
      formdata.append('type', paymentfieldData.paymentfieldData.type);
      formdata.append('_method', 'PUT');
      const response = await paymentformService.updatepaymentfield(
        formdata,
        paymentfieldData.id,
        paymentfieldData.formId,
        paymentfieldData
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const paymentformSlice = createSlice({
  name: 'paymentfields',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpaymentfields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpaymentfields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.paymentfields = action.payload;
      })
      .addCase(getpaymentfields.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApaymentfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApaymentfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.createdpaymentfield = action.payload;
      })
      .addCase(createApaymentfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApaymentfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApaymentfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.fieldpaymentData = action.payload;
        state.fieldpaymentRequired = action.payload[language[0]].required;
        state.fieldpaymentName = action.payload[language[0]].name;
        state.fieldpaymentType = action.payload[language[0]].type;
      })
      .addCase(getApaymentfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApaymentfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApaymentfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedpaymentfield = action.payload;
      })
      .addCase(updateApaymentfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApaymentfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApaymentfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedpaymentfield = action.payload;
      })
      .addCase(deleteApaymentfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default paymentformSlice.reducer;
