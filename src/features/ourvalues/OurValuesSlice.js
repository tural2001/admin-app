import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import ourvalueService from './OurValuesService';

const initialState = {
  ourvalues: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getourvalues = createAsyncThunk(
  'ourvalues/get-ourvalues',
  async (thunkAPI) => {
    try {
      return await ourvalueService.getourvalues();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAourvalue = createAsyncThunk(
  'ourvalues/get-ourvalue',
  async (id, thunkAPI) => {
    try {
      return await ourvalueService.getourvalue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAourvalue = createAsyncThunk(
  'ourvalues/delete-ourvalue',
  async (id, thunkAPI) => {
    try {
      return await ourvalueService.deleteourvalue(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAourvalue = createAsyncThunk(
  'ourvalues/create-ourvalue',
  async (ourvalueData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', ourvalueData.active);
      formdata.append('icon', ourvalueData.icon[0], ourvalueData.icon[0].name);
      formdata.append('title', ourvalueData.title);
      formdata.append('description', ourvalueData.description);
      const response = await ourvalueService.createourvalue(formdata);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAourvalue = createAsyncThunk(
  'ourvalues/update-ourvalue',
  async (ourvalueData, thunkAPI) => {
    console.log(ourvalueData);
    try {
      const formdata = new FormData();
      formdata.append('active', ourvalueData.ourvalue.active);
      formdata.append('title', ourvalueData.ourvalue.title);
      formdata.append('description', ourvalueData.ourvalue.description);
      if (ourvalueData.ourvalue.icon[0] instanceof File) {
        formdata.append(
          'icon',
          ourvalueData.ourvalue.icon[0],
          ourvalueData.ourvalue.icon[0].name
        );
      }
      formdata.append('_method', 'PUT');

      const response = await ourvalueService.updateourvalue(
        formdata,
        ourvalueData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const ourvalueSlice = createSlice({
  name: 'ourvalues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getourvalues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getourvalues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ourvalues = action.payload;
      })
      .addCase(getourvalues.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAourvalue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAourvalue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdOurvalue = action.payload;
      })
      .addCase(createAourvalue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAourvalue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAourvalue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.ourvalueTitle = action.payload.data.title;
        state.ourvalueDescription = action.payload.data.description;
        state.ourvalueActive = action.payload.data.active;
        state.ourvalueIcon = action.payload.data.icon;
      })
      .addCase(getAourvalue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAourvalue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAourvalue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedOurvalue = action.payload;
      })
      .addCase(updateAourvalue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAourvalue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAourvalue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedOurvalue = action.payload;
      })
      .addCase(deleteAourvalue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default ourvalueSlice.reducer;
