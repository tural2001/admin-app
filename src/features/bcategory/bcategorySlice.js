import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
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

export const getAbcategory = createAsyncThunk(
  'getbcategory/get-getbcategory',
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.getbcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAbcategory = createAsyncThunk(
  'bcategory/delete-bcategory',
  async (id, thunkAPI) => {
    try {
      return await bcategoryService.deletebcategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createbcategory = createAsyncThunk(
  'bcategory/create-bcategories',
  async (bcategoryData, thunkAPI) => {
    try {
      return await bcategoryService.createbcategory(bcategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAbcategory = createAsyncThunk(
  'bcategory/update-bcategory',
  async (bcategory, thunkAPI) => {
    try {
      return await bcategoryService.updatebcategory(bcategory);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

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
      })
      .addCase(createbcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createbcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdbcategory = action.payload;
      })
      .addCase(createbcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAbcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAbcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bcategoryName = action.payload.title;
      })
      .addCase(getAbcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAbcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAbcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedbcategory = action.payload;
      })
      .addCase(updateAbcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAbcategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAbcategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedbcategory = action.payload;
      })
      .addCase(deleteAbcategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bcategorySlice.reducer;
