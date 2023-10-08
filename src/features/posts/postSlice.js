import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import postService from './postService';
import { language } from '../../Language/languages';

const initialState = {
  posts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getposts = createAsyncThunk(
  'posts/get-posts',
  async (thunkAPI) => {
    try {
      return await postService.getposts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getApost = createAsyncThunk(
  'posts/get-post',
  async (id, thunkAPI) => {
    console.log(id);
    try {
      return await postService.getpost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteApost = createAsyncThunk(
  'posts/delete-post',
  async (slug, thunkAPI) => {
    try {
      return await postService.deletepost(slug);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createApost = createAsyncThunk(
  'posts/create-post',
  async (postData, thunkAPI) => {
    console.log(postData);
    try {
      const formdata = new FormData();
      formdata.append('title', postData.values.title);
      formdata.append('description', postData.values.description);
      formdata.append('meta_title', postData.values.meta_title);
      formdata.append('slug', postData.values.slug);
      formdata.append('meta_description', postData.values.meta_description);
      formdata.append('published_at', postData.values.published_at);
      formdata.append(
        'image',
        postData.values.image[0],
        postData.values.image[0].name
      );
      const response = await postService.createpost(formdata, postData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateApost = createAsyncThunk(
  'posts/update-post',
  async (postData, thunkAPI) => {
    console.log(postData);
    try {
      const formdata = new FormData();
      formdata.append('title', postData.postData.title);
      formdata.append('description', postData.postData.description);
      formdata.append('meta_title', postData.postData.meta_title);
      formdata.append('slug', postData.postData.slug);
      formdata.append('published_at', postData.postData.published_at);
      formdata.append('meta_description', postData.postData.meta_description);
      if (postData?.postData?.image instanceof File) {
        formdata.append(
          'image',
          postData?.postData?.image,
          postData?.postData?.image?.name
        );
      }
      formdata.append('_method', 'PUT');
      const response = await postService.updatepost(
        formdata,
        postData.postData.id,
        postData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getposts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getposts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getposts.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createApost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdPost = action.payload;
      })
      .addCase(createApost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getApost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.PostData = action.payload;
        state.postImage = action.payload[language[0]].data.image;
        state.postPublished = action.payload[language[0]].data.published_at;
      })
      .addCase(getApost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateApost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPost = action.payload;
      })
      .addCase(updateApost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteApost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedPost = action.payload;
      })
      .addCase(deleteApost.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default postsSlice.reducer;
