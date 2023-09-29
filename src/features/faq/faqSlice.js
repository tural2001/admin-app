import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import faqService from './faqService';
import { language } from '../../Language/languages';

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
        state.createdFaq = action.payload;
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
        console.log(action.payload[language[0]].data.active);
        state.FaqData = action.payload;
        state.FaqActive = action.payload[language[0]].data.active;

        // state.faqQuestion = action.payload.az.data.question;
        // state.faqAnswer = action.payload.az.data.answer;
        // state.faqActive = action.payload.az.data.active;
        // state.faqQuestion = action.payload.en.data.question;
        // state.faqAnswer = action.payload.en.data.answer;
        // state.faqActive = action.payload.en.data.active;
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
        state.updatedFaq = action.payload;
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
