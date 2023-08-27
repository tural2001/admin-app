import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import countryService from './countriesService';

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
      return await countryService.createcountry(countryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAcountry = createAsyncThunk(
  'countries/update-country',
  async (country, thunkAPI) => {
    try {
      return await countryService.updatecountry(country);
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
        state.countryName = action.payload.data.name;
        state.countryActive = action.payload.data.active;
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
