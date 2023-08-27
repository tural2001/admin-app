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
      .addCase(resetState, () => initialState);
  },
});

export default formSlice.reducer;
