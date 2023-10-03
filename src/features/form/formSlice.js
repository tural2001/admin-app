import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import formService from './formService';
import { language } from '../../Language/languages';

const initialState = {
  fields: [],
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
      formdata.append('label', fieldData.values.label);
      formdata.append('name', fieldData.values.name);
      formdata.append('type', fieldData.values.type);
      formdata.append('data', fieldData.values.data);
      formdata.append('required', fieldData.values.required);
      const response = await formService.createfield(formdata);
      return response;
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
      formdata.append('label', fieldData.fieldData.label);
      formdata.append('name', fieldData.fieldData.name);
      formdata.append('required', fieldData.fieldData.required);
      formdata.append('data', fieldData.fieldData.data);
      formdata.append('type', fieldData.fieldData.type);
      formdata.append('_method', 'PUT');
      const response = await formService.updatefield(
        formdata,
        fieldData.id,
        fieldData.formId,
        fieldData
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
  name: 'fields',
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
        console.log(action.payload);
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
        state.FieldData = action.payload;
        state.fieldRequired = action.payload[language[0]].required;
        state.fieldName = action.payload[language[0]].name;
        state.fieldType = action.payload[language[0]].type;
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
