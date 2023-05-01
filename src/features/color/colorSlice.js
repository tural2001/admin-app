import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getColors = createAsyncThunk(
  'color/get-colors',
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAColor = createAsyncThunk(
  'color/get-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAColor = createAsyncThunk(
  'color/delete-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  'color/create-color',
  async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAColor = createAsyncThunk(
  'color/update-color',
  async (color, thunkAPI) => {
    try {
      return await colorService.updateColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colorName = action.payload.name;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedColor = action.payload;
      })
      .addCase(updateAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedColor = action.payload;
      })
      .addCase(deleteAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
