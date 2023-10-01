import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import serviceService from './servicesService';
import { language } from '../../Language/languages';

const initialState = {
  services: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getservices = createAsyncThunk(
  'services/get-services',
  async (thunkAPI) => {
    try {
      return await serviceService.getservices();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAservice = createAsyncThunk(
  'services/get-service',
  async (id, thunkAPI) => {
    try {
      return await serviceService.getservice(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAservice = createAsyncThunk(
  'services/delete-service',
  async (id, thunkAPI) => {
    try {
      return await serviceService.deleteservice(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAservice = createAsyncThunk(
  'services/create-service',
  async (serviceData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', serviceData.active);
      formdata.append('partner', serviceData.partner);
      formdata.append('icon', serviceData.icon[0], serviceData.icon[0].name);
      formdata.append('title', serviceData.title);
      formdata.append('parent_id', serviceData.parent_id);
      formdata.append('meta_title', serviceData.meta_title);
      formdata.append('meta_description', serviceData.meta_description);
      formdata.append('description', serviceData.description);
      const response = await serviceService.createservice(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAservice = createAsyncThunk(
  'services/update-service',
  async (serviceData, thunkAPI) => {
    console.log(serviceData);
    try {
      const formdata = new FormData();
      formdata.append('active', serviceData.service.active);
      formdata.append('partner', serviceData.service.partner);
      formdata.append('title', serviceData.service.title);
      formdata.append('parent_id', serviceData.service.parent_id);
      formdata.append('meta_title', serviceData.service.meta_title);
      formdata.append('meta_description', serviceData.service.meta_description);
      if (serviceData.service.icon[0] instanceof File) {
        formdata.append(
          'icon',
          serviceData.service.icon[0],
          serviceData.service.icon[0].name
        );
      }
      formdata.append('description', serviceData.service.description);
      formdata.append('_method', 'PUT');

      const response = await serviceService.updateservice(
        formdata,
        serviceData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getservices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getservices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.services = action.payload;
      })
      .addCase(getservices.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAservice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAservice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdService = action.payload;
      })
      .addCase(createAservice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAservice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAservice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.serviceData = action.payload;
        state.serviceActive = action.payload[language[0]].data.active;
        state.servicePartner = action.payload[language[0]].data.partner;
        state.serviceIcon = action.payload[language[0]].data.icon;
        state.serviceParentId = action.payload[language[0]].data.parent_id;
      })
      .addCase(getAservice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAservice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAservice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedService = action.payload;
      })
      .addCase(updateAservice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAservice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAservice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedService = action.payload;
      })
      .addCase(deleteAservice.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default servicesSlice.reducer;
