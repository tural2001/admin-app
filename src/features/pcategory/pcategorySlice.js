import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import pcategoryService from './pcategoryService';

const initialState = {
  pcategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpcategories = createAsyncThunk(
  'product/get-products',
  async (thunkAPI) => {
    try {
      return await pcategoryService.getpcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pcategorySlice = createSlice({
  name: 'pcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpcategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pcategories = action.payload;
      })
      .addCase(getpcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      });
  },
});

export default pcategorySlice.reducer;
