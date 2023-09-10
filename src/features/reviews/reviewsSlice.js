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
      const formdata = new FormData();
      formdata.append('reviewer_name', reviewData.reviewer_name);
      formdata.append('comment', reviewData.comment);
      formdata.append(
        'reviewer_image',
        reviewData.reviewer_image[0],
        reviewData.reviewer_image[0].name
      );
      const response = await reviewsService.createReview(formdata);
      return response.data;
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
  async (reviewData, thunkAPI) => {
    console.log(reviewData);
    try {
      const formdata = new FormData();
      formdata.append('active', reviewData.review.active);
      formdata.append('reviewer_name', reviewData.review.reviewer_name);
      formdata.append('comment', reviewData.review.comment);
      if (reviewData.review.reviewer_image[0] instanceof File) {
        formdata.append(
          'reviewer_image',
          reviewData.review.reviewer_image[0],
          reviewData.review.reviewer_image[0].name
        );
      }
      formdata.append('_method', 'PUT');
      const response = await reviewsService.updateReview(
        formdata,
        reviewData.id
      );
      return response.data;
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
        state.reviewReviewer_name = action.payload.data?.reviewer_name;
        state.reviewComment = action.payload.data?.comment;
        state.reviewReviewer_image = action.payload.data?.reviewer_image;
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
