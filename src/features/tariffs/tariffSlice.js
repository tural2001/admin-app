import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import tariffService from './tariffService';

const initialState = {
  tariffs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const gettariffs = createAsyncThunk(
  'tariffs/get-tariffs',
  async (thunkAPI) => {
    try {
      return await tariffService.getTariffs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAtariff = createAsyncThunk(
  'tariffs/get-tariff',
  async (id, thunkAPI) => {
    try {
      return await tariffService.getTariff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAtariff = createAsyncThunk(
  'tariffs/delete-tariff',
  async (id, thunkAPI) => {
    try {
      return await tariffService.deleteTariff(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAtariff = createAsyncThunk(
  'tariffs/create-tariff',
  async (tariffData, thunkAPI) => {
    try {
      const response = await tariffService.createTariff(tariffData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAtariff = createAsyncThunk(
  'tariffs/update-tariff',
  async (tariffData, thunkAPI) => {
    console.log(tariffData);
    try {
      const formdata = new FormData();
      formdata.append('active', tariffData.tariffData.active);
      formdata.append('name', tariffData.tariffData.name);
      formdata.append('price', tariffData.tariffData.price);
      formdata.append('description', tariffData.tariffData.description);
      formdata.append('most_wanted', tariffData.tariffData.most_wanted);
      formdata.append('speed', tariffData.tariffData.speed);
      formdata.append('_method', 'PUT');

      const response = await tariffService.updateTariff(
        formdata,
        tariffData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const blogSlice = createSlice({
  name: 'tariffs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gettariffs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gettariffs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tariffs = action.payload;
      })
      .addCase(gettariffs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAtariff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAtariff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdTariff = action.payload;
      })
      .addCase(createAtariff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAtariff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAtariff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.tariffName = action.payload.data.name;
        state.tariffSpeed = action.payload.data.speed;
        state.tariffPrice = action.payload.data.price;
        state.tariffDescription = action.payload.data.description;
        state.tariffActive = action.payload.data.active;
        state.tariffMostWanted = action.payload.data.most_wanted;
      })
      .addCase(getAtariff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAtariff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAtariff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedTariff = action.payload;
      })
      .addCase(updateAtariff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAtariff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAtariff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedTariff = action.payload;
      })
      .addCase(deleteAtariff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
