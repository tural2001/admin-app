import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bcategoryService from './bcategoryService';

const initialState = {
  bcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getbcategories = createAsyncThunk(
  'bcategory/get-bcategories',
  async (thunkAPI) => {
    try {
      return await bcategoryService.getbcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const bcategorySlice = createSlice({
  name: 'bcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getbcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getbcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bcategories = action.payload;
      })
      .addCase(getbcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default bcategorySlice.reducer;
