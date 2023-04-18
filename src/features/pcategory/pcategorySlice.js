import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
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

export const createCategory = createAsyncThunk(
  'pcategory/create-pcategory',
  async (categoryData, thunkAPI) => {
    try {
      return await pcategoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('revertAll');

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
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pcategorySlice.reducer;
