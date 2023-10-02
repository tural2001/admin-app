import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import popupService from './popupService';
import { language } from '../../Language/languages';

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
  async (handle, thunkAPI) => {
    try {
      return await popupService.getpopup(handle);
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
  async (popupData, thunkAPI) => {
    console.log(popupData);
    try {
      const formdata = new FormData();
      formdata.append('active', popupData.popupData.active);
      formdata.append('content', popupData.popupData.content);
      if (popupData.popupData.image[0] instanceof File) {
        formdata.append(
          'image',
          popupData.popupData.image[0],
          popupData.popupData.image[0].name
        );
      }
      formdata.append('handle', popupData.popupData.handle);
      formdata.append('_method', 'PUT');

      const response = await popupService.updatepopup(
        formdata,
        popupData.id,
        popupData
      );
      return response.data;
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
        state.PopupData = action.payload;
        state.popupHandle = action.payload[language[0]].data.handle;
        state.popupActive = action.payload[language[0]].data.active;
        state.popupImage = action.payload[language[0]].data.image;
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
