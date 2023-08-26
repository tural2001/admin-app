import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import popupService from './vacanciesService';
import vacanciesService from './vacanciesService';
import vacancyService from './vacanciesService';

const initialState = {
  vacancies: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getvacancies = createAsyncThunk(
  'vacancies/get-vacancies',
  async (thunkAPI) => {
    try {
      return await vacancyService.getvacancies();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAvacancy = createAsyncThunk(
  'vacancies/get-vacancy',
  async (id, thunkAPI) => {
    try {
      return await vacancyService.getvacancy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAvacancy = createAsyncThunk(
  'vacancies/delete-vacancy',
  async (id, thunkAPI) => {
    try {
      return await vacancyService.deletevacancy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAvacancy = createAsyncThunk(
  'vacancies/create-vacancy',
  async (vacancyData, thunkAPI) => {
    try {
      const response = await vacancyService.createvacancy(vacancyData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAvacancy = createAsyncThunk(
  'vacancies/update-vacancy',
  async (vacancy, thunkAPI) => {
    try {
      const response = await vacancyService.updatevacancy(vacancy);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const vacancySlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getvacancies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getvacancies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.vacancies = action.payload;
      })
      .addCase(getvacancies.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAvacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAvacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdVacancy = action.payload;
      })
      .addCase(createAvacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAvacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAvacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.vacancyActive = action.payload.data.active;
        state.vacancyTitle = action.payload.data.title;
        state.vacancyDescription = action.payload.data.description;
      })
      .addCase(getAvacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAvacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAvacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedVacancy = action.payload;
      })
      .addCase(updateAvacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAvacancy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAvacancy.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedVacancy = action.payload;
      })
      .addCase(deleteAvacancy.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default vacancySlice.reducer;
