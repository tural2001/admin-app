import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import { language } from '../../Language/languages';
import careerpagepageService from './careerpageService';

const initialState = {
  careerpages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getcareerpages = createAsyncThunk(
  'careerpages/get-careerpage',
  async (thunkAPI) => {
    try {
      return await careerpagepageService.getcareerpages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcareerpage = createAsyncThunk(
  'careerpage/get-careerpage',
  async (id, thunkAPI) => {
    try {
      return await careerpagepageService.getcareerpage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAcareerpage = createAsyncThunk(
  'careerpage/delete-careerpage',
  async (id, thunkAPI) => {
    try {
      return await careerpagepageService.deletecareerpage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAcareerpage = createAsyncThunk(
  'careerpage/create-careerpage',
  async (CareerPageData, thunkAPI) => {
    try {
      return await careerpagepageService.createcareerpage(CareerPageData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAcareerpage = createAsyncThunk(
  'careerpage/update-careerpage',
  async (careerpage, thunkAPI) => {
    try {
      return await careerpagepageService.updatecareerpage(careerpage);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const careerpageSlice = createSlice({
  name: 'careerpages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcareerpages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcareerpages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.careerpages = action.payload;
      })
      .addCase(getcareerpages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAcareerpage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcareerpage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdcareerpage = action.payload;
      })
      .addCase(createAcareerpage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAcareerpage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcareerpage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.PageData = action.payload;
        state.careerpageActive = action.payload[language[0]].data.active;
      })
      .addCase(getAcareerpage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAcareerpage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcareerpage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedcareerpage = action.payload;
      })
      .addCase(updateAcareerpage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAcareerpage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcareerpage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedcareerpage = action.payload;
      })
      .addCase(deleteAcareerpage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default careerpageSlice.reducer;
