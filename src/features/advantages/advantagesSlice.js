import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import advantageService from './advantagesService';
import { language } from '../../Language/languages';

const initialState = {
  advantages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getadvantages = createAsyncThunk(
  'advantages/get-advantages',
  async (thunkAPI) => {
    try {
      return await advantageService.getadvantages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAadvantage = createAsyncThunk(
  'advantages/get-advantage',
  async (id, thunkAPI) => {
    try {
      return await advantageService.getadvantage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAadvantage = createAsyncThunk(
  'advantages/delete-advantage',
  async (id, thunkAPI) => {
    try {
      return await advantageService.deleteadvantage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAadvantage = createAsyncThunk(
  'advantages/create-advantage',
  async (advantageData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', advantageData.values.active);
      formdata.append(
        'icon',
        advantageData.values.icon[0],
        advantageData.values.icon[0].name
      );
      formdata.append('title', advantageData.values.title);

      const response = await advantageService.createadvantage(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAadvantage = createAsyncThunk(
  'advantages/update-advantage',
  async (advantageData, thunkAPI) => {
    console.log(advantageData);
    try {
      const formdata = new FormData();
      formdata.append('active', advantageData.advantageData.active);
      formdata.append('title', advantageData.advantageData.title);
      if (advantageData.advantageData.icon instanceof File) {
        formdata.append(
          'icon',
          advantageData.advantageData.icon,
          advantageData.advantageData.icon.name
        );
      }
      formdata.append('_method', 'PUT');

      const response = await advantageService.updateadvantage(
        formdata,
        advantageData.id,
        advantageData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const advantageSlice = createSlice({
  name: 'advantages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getadvantages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getadvantages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.advantages = action.payload;
      })
      .addCase(getadvantages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAadvantage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAadvantage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdAdvantage = action.payload;
      })
      .addCase(createAadvantage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAadvantage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAadvantage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.AdData = action.payload;
        state.advantageActive = action.payload[language[0]].data.active;
        state.AdIcon = action.payload[language[0]].data.icon;
      })
      .addCase(getAadvantage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAadvantage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAadvantage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedAdvantage = action.payload;
      })
      .addCase(updateAadvantage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAadvantage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAadvantage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedAdvantage = action.payload;
      })
      .addCase(deleteAadvantage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default advantageSlice.reducer;
