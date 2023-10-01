import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import servicecategoriesService from './servicecategoriesService';
import { language } from '../../Language/languages';

const initialState = {
  servicecategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getServicecategories = createAsyncThunk(
  'servicecategories/get-service-categories',
  async (thunkAPI) => {
    try {
      return await servicecategoriesService.getservicecategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getServicecategory = createAsyncThunk(
  'servicecategories/get-service-category',
  async (id, thunkAPI) => {
    try {
      return await servicecategoriesService.getservicecategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createServicecategories = createAsyncThunk(
  'servicecategories/create-service-categories',
  async (servicecategoryData, thunkAPI) => {
    console.log(servicecategoryData);
    try {
      const formdata = new FormData();
      formdata.append('name', servicecategoryData.values.name);
      formdata.append('active', servicecategoryData.values.active);
      formdata.append(
        'icon',
        servicecategoryData?.values.icon[0],
        servicecategoryData?.values.icon[0]?.name
      );
      const response = await servicecategoriesService.createservicecategories(
        formdata
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteServicecategories = createAsyncThunk(
  'servicecategories/delete-service-categories',
  async (servicecategory, thunkAPI) => {
    try {
      return await servicecategoriesService.deleteservicecategories(
        servicecategory
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateServicecategories = createAsyncThunk(
  'servicecategories/update-service-categories',
  async (servicecategoryData, thunkAPI) => {
    console.log(servicecategoryData);
    try {
      const formdata = new FormData();
      formdata.append('active', servicecategoryData.servicecData.active);
      formdata.append('name', servicecategoryData.servicecData.name);
      if (servicecategoryData.servicecData.icon instanceof File) {
        formdata.append(
          'icon',
          servicecategoryData.servicecData?.icon,
          servicecategoryData.servicecData.icon.name
        );
      }
      formdata.append('_method', 'PUT');
      const response = await servicecategoriesService.updateservicecategories(
        formdata,
        servicecategoryData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('revertAll');

export const servicecategorySlice = createSlice({
  name: 'servicecategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServicecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.serviceC = action.payload;
      })
      .addCase(getServicecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createServicecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createServicecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdserviceC = action.payload;
      })
      .addCase(createServicecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getServicecategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicecategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.serviceCData = action.payload;
        state.serviceCActive = action.payload[language[0]].data.active;
        state.serviceCIcon = action.payload[language[0]].data.icon;
      })
      .addCase(getServicecategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateServicecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateServicecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedserviceC = action.payload;
      })
      .addCase(updateServicecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteServicecategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteServicecategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedserviceC = action.payload;
      })
      .addCase(deleteServicecategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default servicecategorySlice.reducer;
