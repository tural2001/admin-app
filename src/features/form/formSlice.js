import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import formService from './formService';

const initialState = {
  forms: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getforms = createAsyncThunk(
  'forms/get-forms',
  async (thunkAPI) => {
    try {
      return await formService.getforms();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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

export const getAform = createAsyncThunk(
  'forms/get-form',
  async (id, thunkAPI) => {
    try {
      return await formService.getform(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAfield = createAsyncThunk(
  'fields/get-field',
  async ({ formId, id }, thunkAPI) => {
    try {
      const fieldData = await formService.getfield(formId, id);
      console.log(fieldData);
      return { id, formId, fieldData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAform = createAsyncThunk(
  'forms/delete-form',
  async (id, thunkAPI) => {
    try {
      return await formService.deleteform(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAfield = createAsyncThunk(
  'fields/delete-field',
  async ({ formId, id }, thunkAPI) => {
    console.log(id);
    try {
      await formService.deletefield(formId, id);
      return { id, formId };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAform = createAsyncThunk(
  'forms/create-form',
  async (formData, thunkAPI) => {
    try {
      const response = await formService.createform(formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAfield = createAsyncThunk(
  'fields/create-field',
  async (fieldData, id, thunkAPI) => {
    console.log(fieldData);
    try {
      const response = await formService.createfield(fieldData, id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAform = createAsyncThunk(
  'forms/update-form',
  async (formData, thunkAPI) => {
    console.log(formData);
    try {
      const formdata = new FormData();
      formdata.append('active', formData.formData.active);
      formdata.append('name', formData.formData.name);
      formdata.append('handle', formData.formData.handle);
      formdata.append('_method', 'PUT');

      const response = await formService.updateform(formdata, formData.id);
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
      const formdata = new FormData();
      formdata.append('label', fieldData.field.label);
      formdata.append('name', fieldData.field.name);
      formdata.append('rules', fieldData.field.rules);
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
      .addCase(getforms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getforms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.forms = action.payload;
      })
      .addCase(getforms.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdForm = action.payload;
      })
      .addCase(createAform.rejected, (state, action) => {
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
      .addCase(getAform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.formName = action.payload.data.name;
        state.formActive = action.payload.data.active;
        state.formHandle = action.payload.data.handle;
      })
      .addCase(getAform.rejected, (state, action) => {
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
        state.fieldLabel = action.payload.fieldData.label;
        state.fieldRules = action.payload.fieldData.rules;
        state.fielddata = action.payload.fieldData.data;
        state.fieldName = action.payload.fieldData.name;
        state.fieldType = action.payload.fieldData.type;
      })
      .addCase(getAfield.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedForm = action.payload;
      })
      .addCase(updateAform.rejected, (state, action) => {
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
      .addCase(deleteAform.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAform.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deleteForm = action.payload;
      })
      .addCase(deleteAform.rejected, (state, action) => {
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
        state.deleteField = action.payload;
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
