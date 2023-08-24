import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import reviewsService from './reviewsService';

const initialState = {
  reviews: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getreviews = createAsyncThunk(
  'reviews/get-reviews',
  async (thunkAPI) => {
    try {
      return await reviewsService.getReviews();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAreview = createAsyncThunk(
  'reviews/get-review',
  async (id, thunkAPI) => {
    try {
      return await reviewsService.getReview(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAreview = createAsyncThunk(
  'reviews/create-review',
  async (reviewData, thunkAPI) => {
    try {
      return await reviewsService.createReview(reviewData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAreview = createAsyncThunk(
  'reviews/delete-review',
  async (review, thunkAPI) => {
    try {
      return await reviewsService.deleteReview(review);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAreview = createAsyncThunk(
  'reviews/update-review',
  async (review, thunkAPI) => {
    try {
      return await reviewsService.updateReview(review);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('revertAll');

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getreviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getreviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviews = action.payload;
      })
      .addCase(getreviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdReview = action.payload;
      })
      .addCase(createAreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.reviewActive = action.payload.data?.active;
        state.reviewShow_on_home_page = action.payload.data?.show_on_home_page;
        state.reviewReviewer_name = action.payload.data?.reviewer_name;
        state.reviewComment = action.payload.data?.comment;
      })
      .addCase(getAreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedReview = action.payload;
      })
      .addCase(updateAreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedReview = action.payload;
      })
      .addCase(deleteAreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default reviewsSlice.reducer;
