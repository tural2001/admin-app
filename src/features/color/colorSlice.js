import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import colorService from './colorService';
import { language } from '../../Language/languages';

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getcolors = createAsyncThunk(
  'colors/get-color',
  async (thunkAPI) => {
    try {
      return await colorService.getcolors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcolor = createAsyncThunk(
  'color/get-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.getcolor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAcolor = createAsyncThunk(
  'color/delete-color',
  async (id, thunkAPI) => {
    try {
      return await colorService.deletecolor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAcolor = createAsyncThunk(
  'color/create-color',
  async (colorData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', colorData.values.active);
      formdata.append('name', colorData.values.name);
      formdata.append('code', colorData.values.code);
      const response = await colorService.createcolor(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAcolor = createAsyncThunk(
  'color/update-color',
  async (colorData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', colorData.colorData.active);
      formdata.append('name', colorData.colorData.name);
      formdata.append('code', colorData.colorData.code);
      formdata.append('_method', 'PUT');

      const response = await colorService.updatecolor(
        formdata,
        colorData.id,
        colorData
      );
      return response.data;
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
      .addCase(getcolors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcolors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.colors = action.payload;
      })
      .addCase(getcolors.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAcolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdcolor = action.payload;
      })
      .addCase(createAcolor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAcolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ColorData = action.payload;
        state.colorActive = action.payload[language[0]].data.active;
        state.colorCode = action.payload[language[0]].data.code;
      })
      .addCase(getAcolor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAcolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedcolor = action.payload;
      })
      .addCase(updateAcolor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAcolor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcolor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedcolor = action.payload;
      })
      .addCase(deleteAcolor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
