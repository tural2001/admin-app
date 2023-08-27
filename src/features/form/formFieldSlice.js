import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import fieldService from './formFieldService';

const initialState = {
  fields: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getAfield = createAsyncThunk(
  'fields/get-field',
  async (id, thunkAPI) => {
    try {
      return await fieldService.getfield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAfield = createAsyncThunk(
  'fields/delete-field',
  async (id, thunkAPI) => {
    try {
      return await fieldService.deletefield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAfield = createAsyncThunk(
  'fields/create-field',
  async (fieldData, thunkAPI) => {
    try {
      const response = await fieldService.createfield(fieldData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAfield = createAsyncThunk(
  'fields/update-field',
  async (fieldData, thunkAPI) => {
    console.log(fieldData);
    try {
      const fielddata = new fieldData();
      fielddata.append('active', fieldData.fieldData.active);
      fielddata.append('name', fieldData.fieldData.name);
      fielddata.append('handle', fieldData.fieldData.handle);
      fielddata.append('_method', 'PUT');

      const response = await fieldService.updatefield(fielddata, fieldData.id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const fieldSlice = createSlice({
  name: 'fields',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdfield = action.payload;
      })
      .addCase(createAfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.fieldName = action.payload.data.name;
        state.fieldActive = action.payload.data.active;
        state.fieldHandle = action.payload.data.handle;
      })
      .addCase(getAfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedfield = action.payload;
      })
      .addCase(updateAfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletefield = action.payload;
      })
      .addCase(deleteAfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default fieldSlice.reducer;
