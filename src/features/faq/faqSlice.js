import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import faqService from './faqService';

const initialState = {
  faqs: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getfaqs = createAsyncThunk('faqs/get-faq', async (thunkAPI) => {
  try {
    return await faqService.getfaqs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAfaq = createAsyncThunk('faq/get-faq', async (id, thunkAPI) => {
  try {
    return await faqService.getfaq(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const deleteAfaq = createAsyncThunk(
  'faq/delete-faq',
  async (id, thunkAPI) => {
    try {
      return await faqService.deletefaq(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAfaq = createAsyncThunk(
  'faq/create-faq',
  async (faqData, thunkAPI) => {
    try {
      return await faqService.createfaq(faqData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAfaq = createAsyncThunk(
  'faq/update-faq',
  async (faq, thunkAPI) => {
    try {
      return await faqService.updatefaq(faq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const faqSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getfaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getfaqs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqs = action.payload;
      })
      .addCase(getfaqs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAfaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAfaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdfaq = action.payload;
      })
      .addCase(createAfaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAfaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAfaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.faqQuestion = action.payload.data.question;
        state.faqAnswer = action.payload.data.answer;
        state.faqActive = action.payload.data.active;
      })
      .addCase(getAfaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAfaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAfaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedfaq = action.payload;
      })
      .addCase(updateAfaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAfaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAfaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedfaq = action.payload;
      })
      .addCase(deleteAfaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default faqSlice.reducer;
