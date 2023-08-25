import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import popupService from './popupService';

const initialState = {
  popups: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpopups = createAsyncThunk(
  'popups/get-popups',
  async (thunkAPI) => {
    try {
      return await popupService.getpopups();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApopup = createAsyncThunk(
  'popups/get-popup',
  async (id, thunkAPI) => {
    try {
      return await popupService.getpopup(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApopup = createAsyncThunk(
  'popups/delete-popup',
  async (id, thunkAPI) => {
    try {
      return await popupService.deletepopup(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApopup = createAsyncThunk(
  'popups/create-popup',
  async (popupData, thunkAPI) => {
    console.log(popupData);
    try {
      const formdata = new FormData();
      formdata.append('active', popupData.active);
      formdata.append('image', popupData.image[0], popupData.image[0].name);
      formdata.append('content', popupData.content);
      formdata.append('handle', popupData.handle);

      const response = await popupService.createpopup(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateApopup = createAsyncThunk(
  'popups/update-popup',
  async (popup, thunkAPI) => {
    try {
      const response = await popupService.updatepopup(popup); // Call your updatepopup function
      return response.data; // Assuming the response contains the updated data
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const popupSlice = createSlice({
  name: 'popups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpopups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpopups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.popups = action.payload;
      })
      .addCase(getpopups.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApopup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApopup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPopup = action.payload;
      })
      .addCase(createApopup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApopup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApopup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.popupContent = action.payload.data.content;
        state.popupActive = action.payload.data.active;
        state.popupHandle = action.payload.data.handle;
        state.popupImage = action.payload.data.image;
      })
      .addCase(getApopup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApopup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApopup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPopup = action.payload;
      })
      .addCase(updateApopup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApopup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApopup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPopup = action.payload;
      })
      .addCase(deleteApopup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default popupSlice.reducer;
