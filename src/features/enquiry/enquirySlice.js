import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import enquiryService from './enquiryService';

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getEnquiries = createAsyncThunk(
  'enquiry/get-enquiries',
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEnquiry = createAsyncThunk(
  'enquiry/get-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAEnquiry = createAsyncThunk(
  'enquiry/delete-enquiry',
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAEnquiry = createAsyncThunk(
  'enquiry/update-enquiry',
  async (enq, thunkAPI) => {
    try {
      return await enquiryService.updateEnquiry(enq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const enquirySlice = createSlice({
  name: 'enquiries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.enquiryName = action.payload.name;
        state.enquiryEmail = action.payload.email;
        state.enquiryMobile = action.payload.mobile;
        state.enquiryComment = action.payload.comment;
        state.enquiryStatus = action.payload.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
