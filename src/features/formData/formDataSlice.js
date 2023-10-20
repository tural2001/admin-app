import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import formService from './formDataService';

const initialState = {
  formdatas: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getformdatas = createAsyncThunk(
  'formdatas/get-formdatas',
  async (id, thunkAPI) => {
    try {
      return await formService.getformdatas(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAformdata = createAsyncThunk(
  'formdatas/get-formdata',
  async (id, thunkAPI) => {
    try {
      return await formService.getformdata(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAformdata = createAsyncThunk(
  'formdatas/delete-formdata',
  async (id, thunkAPI) => {
    try {
      return await formService.deleteformdata(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const formDataSlice = createSlice({
  name: 'formdatas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getformdatas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getformdatas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.formdatas = action.payload;
      })
      .addCase(getformdatas.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(getAformdata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAformdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.formdataLabel = action.payload.label;
        state.formdataRules = action.payload.rules;
        state.formdatadata = action.payload.data;
        state.formdataName = action.payload.name;
        state.formdataType = action.payload.type;
      })
      .addCase(getAformdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(deleteAformdata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAformdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedformdata = action.payload;
      })
      .addCase(deleteAformdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default formDataSlice.reducer;
