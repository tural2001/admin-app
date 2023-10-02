import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import partnerService from './partnersService';
import { language } from '../../Language/languages';

const initialState = {
  partners: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpartners = createAsyncThunk(
  'partners/get-partners',
  async (thunkAPI) => {
    try {
      return await partnerService.getpartners();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApartner = createAsyncThunk(
  'partners/create-partner',
  async (partnerData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', partnerData.active);
      formdata.append('logo', partnerData.logo[0], partnerData.logo[0].name);
      formdata.append('name', partnerData.name);
      const response = await partnerService.createpartner(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateApartner = createAsyncThunk(
  'partners/update-partner',
  async (partnerData, thunkAPI) => {
    console.log(partnerData);
    try {
      const formdata = new FormData();
      formdata.append('active', partnerData.partnerData.active);
      if (partnerData.partnerData.logo[0] instanceof File) {
        formdata.append(
          'logo',
          partnerData.partnerData.logo[0],
          partnerData.partnerData.logo[0].name
        );
      }
      formdata.append('name', partnerData.partnerData.name);
      formdata.append('_method', 'PUT');

      const response = await partnerService.updatepartner(
        formdata,
        partnerData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApartner = createAsyncThunk(
  'partners/get-partner',
  async (id, thunkAPI) => {
    try {
      return await partnerService.getpartner(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApartner = createAsyncThunk(
  'partners/delete-partner',
  async (id, thunkAPI) => {
    try {
      return await partnerService.deletepartner(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpartners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.partners = action.payload;
      })
      .addCase(getpartners.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.PartnerName = action.payload.data.name;
        state.partnerLogo = action.payload.data.logo;
        state.partnerActive = action.payload.data.active;
      })
      .addCase(getApartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPartner = action.payload;
      })
      .addCase(createApartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPartner = action.payload;
      })
      .addCase(updateApartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPartner = action.payload;
      })
      .addCase(deleteApartner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default partnerSlice.reducer;
