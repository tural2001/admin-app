import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import campaignService from './campaignsService';
import { language } from '../../Language/languages';

const initialState = {
  campaigns: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getcampaigns = createAsyncThunk(
  'campaigns/get-campaigns',
  async (thunkAPI) => {
    try {
      return await campaignService.getcampaigns();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcampaign = createAsyncThunk(
  'campaigns/get-campaign',
  async (id, thunkAPI) => {
    try {
      return await campaignService.getcampaign(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAcampaign = createAsyncThunk(
  'campaigns/delete-campaign',
  async (id, thunkAPI) => {
    try {
      return await campaignService.deletecampaign(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAcampaign = createAsyncThunk(
  'campaigns/create-campaign',
  async (campaignData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', campaignData.values.active);
      formdata.append(
        'image',
        campaignData?.values?.image[0],
        campaignData?.values?.image?.name
      );
      formdata.append('name', campaignData.values.name);
      formdata.append('description', campaignData.values.description);
      const response = await campaignService.createcampaign(formdata);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAcampaign = createAsyncThunk(
  'campaigns/update-campaign',
  async (campaignData, thunkAPI) => {
    console.log(campaignData);
    try {
      const formdata = new FormData();
      formdata.append('active', campaignData.campaignData.active);
      formdata.append('name', campaignData.campaignData.name);
      if (campaignData.campaignData.image instanceof File) {
        formdata.append(
          'image',
          campaignData.campaignData.image,
          campaignData.campaignData.image.name
        );
      }
      formdata.append('description', campaignData.campaignData.description);
      formdata.append('_method', 'PUT');
      const response = await campaignService.updatecampaign(
        formdata,
        campaignData.id,
        campaignData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcampaigns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.campaigns = action.payload;
      })
      .addCase(getcampaigns.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAcampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCampaign = action.payload;
      })
      .addCase(createAcampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAcampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CampaignData = action.payload;
        state.campaignActive = action.payload[language[0]].data.active;
        state.campaignImage = action.payload[language[0]].data.image;
      })
      .addCase(getAcampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAcampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCampaign = action.payload;
      })
      .addCase(updateAcampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAcampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCampaign = action.payload;
      })
      .addCase(deleteAcampaign.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default campaignSlice.reducer;
