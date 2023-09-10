import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import regionService from './regionService';

const initialState = {
  regions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getregions = createAsyncThunk(
  'regions/get-regions',
  async (thunkAPI) => {
    try {
      return await regionService.getregions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAregion = createAsyncThunk(
  'regions/get-region',
  async (id, thunkAPI) => {
    try {
      return await regionService.getregion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAregion = createAsyncThunk(
  'regions/delete-region',
  async (id, thunkAPI) => {
    try {
      return await regionService.deleteregion(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAregion = createAsyncThunk(
  'regions/create-region',
  async (regionData, thunkAPI) => {
    try {
      const response = await regionService.createregion(regionData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAregion = createAsyncThunk(
  'regions/update-region',
  async (regionData, thunkAPI) => {
    console.log(regionData);
    try {
      const formdata = new FormData();
      formdata.append('active', regionData.regionData.active);
      formdata.append('name', regionData.regionData.name);
      formdata.append('description', regionData.regionData.description);
      formdata.append('handle', regionData.regionData.handle);
      formdata.append('color_id', regionData.regionData.color_id);
      formdata.append('_method', 'PUT');

      const response = await regionService.updateregion(
        formdata,
        regionData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const regionSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getregions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getregions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.regions = action.payload;
      })
      .addCase(getregions.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAregion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAregion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdRegion = action.payload;
      })
      .addCase(createAregion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAregion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAregion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.regionName = action.payload.data.name;
        state.regionActive = action.payload.data.active;
        state.regionColor = action.payload.data.color_id;
        state.regionDescription = action.payload.data.description;
        state.regionHandle = action.payload.data.handle;
      })
      .addCase(getAregion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAregion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAregion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedRegion = action.payload;
      })
      .addCase(updateAregion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAregion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAregion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedRegion = action.payload;
      })
      .addCase(deleteAregion.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default regionSlice.reducer;
