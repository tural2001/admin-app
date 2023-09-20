import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import formService from './formService';

const initialState = {
  forms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getfields = createAsyncThunk(
  'fields/get-fields',
  async (id, thunkAPI) => {
    try {
      return await formService.getfields(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAfield = createAsyncThunk(
  'fields/get-field',
  async (id, thunkAPI) => {
    try {
      return await formService.getfield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAfield = createAsyncThunk(
  'fields/delete-field',
  async (id, thunkAPI) => {
    try {
      return await formService.deletefield(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAfield = createAsyncThunk(
  'fields/create-field',
  async (fieldData, thunkAPI) => {
    console.log(fieldData);
    try {
      const formdata = new FormData();
      formdata.append('label', fieldData.label);
      formdata.append('name', fieldData.name);
      formdata.append('required', fieldData.required);
      formdata.append('data', fieldData.data);
      formdata.append('type', fieldData.type);
      const response = await formService.createfield(formdata);
      console.log(response.data);
      return response.data;
      // const response = await formService.createfield(fieldData);
      // return response.data;
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
      const formdata = new FormData();
      formdata.append('label', fieldData.field.label);
      formdata.append('name', fieldData.field.name);
      formdata.append('required', fieldData.field.required);
      formdata.append('data', fieldData.field.data);
      formdata.append('type', fieldData.field.type);
      formdata.append('_method', 'PUT');
      const response = await formService.updatefield(
        formdata,
        fieldData.id,
        fieldData.formId
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getfields.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getfields.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.fields = action.payload;
      })
      .addCase(getfields.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAfield.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAfield.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdField = action.payload;
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
        state.fieldLabel = action.payload.label;
        state.fieldRequired = action.payload.required;
        state.fielddata = action.payload.data;
        state.fieldName = action.payload.name;
        state.fieldType = action.payload.type;
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
        state.updatedField = action.payload;
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
        state.deletedField = action.payload;
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

export default formSlice.reducer;
