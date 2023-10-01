import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import countryService from './countriesService';
import { language } from '../../Language/languages';

const initialState = {
  countries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getcountries = createAsyncThunk(
  'countries/get-countries',
  async (thunkAPI) => {
    try {
      return await countryService.getcountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcountry = createAsyncThunk(
  'countries/get-country',
  async (id, thunkAPI) => {
    try {
      return await countryService.getcountry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAcountry = createAsyncThunk(
  'countries/delete-country',
  async (id, thunkAPI) => {
    try {
      return await countryService.deletecountry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAcountry = createAsyncThunk(
  'countries/create-country',
  async (countryData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', countryData.values.active);
      formdata.append('name', countryData.values.name);
      const response = await countryService.createcountry(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAcountry = createAsyncThunk(
  'countries/update-country',
  async (countryData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', countryData.countryData.active);
      formdata.append('name', countryData.countryData.name);
      formdata.append('_method', 'PUT');
      const response = await countryService.updatecountry(
        formdata,
        countryData.id,
        countryData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.countries = action.payload;
      })
      .addCase(getcountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAcountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdCountry = action.payload;
      })
      .addCase(createAcountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAcountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CountryData = action.payload;
        state.countryActive = action.payload[language[0]].data.active;
      })
      .addCase(getAcountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAcountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedCountry = action.payload;
      })
      .addCase(updateAcountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAcountry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcountry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedCountry = action.payload;
      })
      .addCase(deleteAcountry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default countrySlice.reducer;
