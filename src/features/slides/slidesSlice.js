import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import slideService from './slidesService';

const initialState = {
  slides: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getslides = createAsyncThunk(
  'slides/get-slides',
  async (thunkAPI) => {
    try {
      return await slideService.getslides();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAslide = createAsyncThunk(
  'slides/get-slide',
  async (id, thunkAPI) => {
    try {
      return await slideService.getslide(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAslide = createAsyncThunk(
  'slides/delete-slide',
  async (id, thunkAPI) => {
    try {
      return await slideService.deleteslide(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAslide = createAsyncThunk(
  'slides/create-slide',
  async (slideData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', slideData.active);
      formdata.append('order', slideData.order);
      formdata.append('image', slideData.image[0], slideData.image[0].name);
      formdata.append('title', slideData.title);
      formdata.append('description', slideData.description);
      formdata.append('button_text', slideData.button_text);
      formdata.append('button_link', slideData.button_link);
      formdata.append('show_button', slideData.show_button);
      const response = await slideService.createslide(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAslide = createAsyncThunk(
  'slides/update-slide',
  async (slideData, thunkAPI) => {
    console.log(slideData);
    try {
      const formdata = new FormData();
      formdata.append('active', slideData.slide.active);
      formdata.append('title', slideData.slide.title);
      formdata.append('order', slideData.slide.order);
      formdata.append('button_text', slideData.slide.button_text);
      formdata.append('button_link', slideData.slide.button_link);
      formdata.append('show_button', slideData.slide.show_button);
      if (slideData.slide.image[0] instanceof File) {
        formdata.append(
          'image',
          slideData.slide.image[0],
          slideData.slide.image[0].name
        );
      }
      formdata.append('description', slideData.slide.description);
      formdata.append('_method', 'PUT');
      const response = await slideService.updateslide(formdata, slideData.id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const slideSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getslides.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getslides.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.slides = action.payload;
      })
      .addCase(getslides.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAslide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAslide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdSlide = action.payload;
      })
      .addCase(createAslide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAslide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAslide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.slideTitle = action.payload.data.title;
        state.slideActive = action.payload.data.active;
        state.slideOrder = action.payload.data.order;
        state.slideShow_button = action.payload.data.show_button;
        state.slideButton_text = action.payload.data.button_text;
        state.slideButton_link = action.payload.data.button_link;
        state.slideDescription = action.payload.data.description;
        state.slideImage = action.payload.data.image;
      })
      .addCase(getAslide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAslide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAslide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedSlide = action.payload;
      })
      .addCase(updateAslide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAslide.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAslide.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedSlide = action.payload;
      })
      .addCase(deleteAslide.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default slideSlice.reducer;
