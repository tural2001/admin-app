import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import pageService from './pagesService';

const initialState = {
  pages: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getpages = createAsyncThunk(
  'pages/get-pages',
  async (thunkAPI) => {
    try {
      return await pageService.getpages();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApage = createAsyncThunk(
  'pages/get-page',
  async (slug, thunkAPI) => {
    try {
      return await pageService.getpage(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApage = createAsyncThunk(
  'pages/delete-page',
  async (slug, thunkAPI) => {
    try {
      return await pageService.deletepage(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApage = createAsyncThunk(
  'pages/create-page',
  async (pageData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('title', pageData.values.title);
      formdata.append('slug', pageData.values.slug);
      formdata.append('meta_title', pageData.values.meta_title);
      formdata.append('meta_description', pageData.values.meta_description);
      formdata.append('content', pageData.values.content);
      formdata.append('_method', 'PUT');
      const response = await pageService.createpage(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateApage = createAsyncThunk(
  'pages/update-page',
  async (pageData, thunkAPI) => {
    console.log(pageData);
    try {
      const formdata = new FormData();
      formdata.append('title', pageData.pageData.title);
      formdata.append('slug', pageData.pageData.slug);
      formdata.append('meta_title', pageData.pageData.meta_title);
      formdata.append('meta_description', pageData.pageData.meta_description);
      formdata.append('content', pageData.pageData.content);
      formdata.append('_method', 'PUT');

      const response = await pageService.updatepage(
        formdata,
        pageData.pageData.slug,
        pageData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const pageSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getpages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getpages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.pages = action.payload;
      })
      .addCase(getpages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPage = action.payload;
      })
      .addCase(createApage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.PageData = action.payload.data.title;
      })
      .addCase(getApage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPage = action.payload;
      })
      .addCase(updateApage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPage = action.payload;
      })
      .addCase(deleteApage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default pageSlice.reducer;
