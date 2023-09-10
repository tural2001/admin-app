import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import faqformService from './faqformService';

const initialState = {
  faqforms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getfaqforms = createAsyncThunk(
  'faqforms/get-faqform',
  async (thunkAPI) => {
    try {
      return await faqformService.getfaqforms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAfaqform = createAsyncThunk(
  'faqform/get-faqform',
  async (id, thunkAPI) => {
    try {
      return await faqformService.getfaqform(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAfaqform = createAsyncThunk(
  'faqform/delete-faqform',
  async (id, thunkAPI) => {
    try {
      return await faqformService.deletefaqform(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAfaqform = createAsyncThunk(
  'faqform/create-faqform',
  async (faqformData, thunkAPI) => {
    try {
      return await faqformService.createfaqform(faqformData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAfaqform = createAsyncThunk(
  'faqform/update-faqform',
  async (faqform, thunkAPI) => {
    try {
      return await faqformService.updatefaqform(faqform);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const faqformSlice = createSlice({
  name: 'faqforms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getfaqforms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getfaqforms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqforms = action.payload;
      })
      .addCase(getfaqforms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAfaqform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAfaqform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdfaqform = action.payload;
      })
      .addCase(createAfaqform.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAfaqform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAfaqform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqformName = action.payload.data.name;
        state.faqformPhone = action.payload.data.phone;
        state.faqformQuestion = action.payload.data.question;
      })
      .addCase(getAfaqform.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAfaqform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAfaqform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedfaqform = action.payload;
      })
      .addCase(updateAfaqform.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAfaqform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAfaqform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedfaqform = action.payload;
      })
      .addCase(deleteAfaqform.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default faqformSlice.reducer;
