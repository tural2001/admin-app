import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import settingService from './settingService';

const initialState = {
  settings: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getsettings = createAsyncThunk(
  'settings/get-settings',
  async (thunkAPI) => {
    try {
      return await settingService.getsettings();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAsetting = createAsyncThunk(
  'setting/get-setting',
  async (id, thunkAPI) => {
    try {
      return await settingService.getsetting(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAsetting = createAsyncThunk(
  'setting/delete-setting',
  async (id, thunkAPI) => {
    try {
      return await settingService.deletesetting(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAsetting = createAsyncThunk(
  'setting/create-setting',
  async (settingData, thunkAPI) => {
    try {
      return await settingService.createsetting(settingData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAsetting = createAsyncThunk(
  'setting/update-setting',
  async (setting, thunkAPI) => {
    try {
      return await settingService.updatesetting(setting);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getsettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getsettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.settings = action.payload;
      })
      .addCase(getsettings.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAsetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAsetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdSetting = action.payload;
      })
      .addCase(createAsetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAsetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAsetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.settingKey = action.payload.data.key;
        state.settingValue = action.payload.data.value;
      })
      .addCase(getAsetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAsetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAsetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedSetting = action.payload;
      })
      .addCase(updateAsetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAsetting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAsetting.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedSetting = action.payload;
      })
      .addCase(deleteAsetting.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default settingSlice.reducer;
