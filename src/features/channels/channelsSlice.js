import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import channelService from './channelsService';

const initialState = {
  channels: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getchannels = createAsyncThunk(
  'channels/get-channels',
  async (thunkAPI) => {
    try {
      return await channelService.getchannels();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAchannel = createAsyncThunk(
  'channels/get-channel',
  async (id, thunkAPI) => {
    try {
      return await channelService.getchannel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAchannel = createAsyncThunk(
  'channels/delete-channel',
  async (id, thunkAPI) => {
    try {
      return await channelService.deletechannel(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAchannel = createAsyncThunk(
  'channels/create-channel',
  async (channelData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', channelData.active);
      formdata.append('image', channelData.image[0], channelData.image[0].name);
      formdata.append('name', channelData.name);
      formdata.append('meta_title', channelData.meta_title);
      formdata.append('meta_description', channelData.meta_description);
      formdata.append('country_id', channelData.country_id);
      const response = await channelService.createchannel(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAchannel = createAsyncThunk(
  'channels/update-channel',
  async (channelData, thunkAPI) => {
    console.log(channelData);
    try {
      const formdata = new FormData();
      formdata.append('active', channelData.channel.active);
      formdata.append('name', channelData.channel.name);
      formdata.append('meta_title', channelData.channel.meta_title);
      formdata.append('meta_description', channelData.channel.meta_description);
      if (channelData.channel.image[0] instanceof File) {
        formdata.append(
          'image',
          channelData.channel.image[0],
          channelData.channel.image[0].name
        );
      }
      formdata.append('country_id', channelData.channel.country_id);
      formdata.append('_method', 'PUT');
      const response = await channelService.updatechannel(
        formdata,
        channelData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getchannels.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getchannels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.channels = action.payload;
      })
      .addCase(getchannels.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAchannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdChannel = action.payload;
      })
      .addCase(createAchannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAchannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.channelName = action.payload.data.name;
        state.channelMeta_title = action.payload.data.meta_title;
        state.channelMeta_description = action.payload.data.meta_description;
        state.channelActive = action.payload.data.active;
        state.channelCountry_id = action.payload.data.country_id;
        state.channelImage = action.payload.data.image;
      })
      .addCase(getAchannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAchannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedChannel = action.payload;
      })
      .addCase(updateAchannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAchannel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAchannel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedChannel = action.payload;
      })
      .addCase(deleteAchannel.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default channelSlice.reducer;
