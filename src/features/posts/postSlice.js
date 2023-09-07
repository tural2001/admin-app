import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import postService from './postService';

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
  async (slug, thunkAPI) => {
    try {
      return await postService.getpost(slug);
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
    try {
      const formdata = new FormData();
      formdata.append('title', postData.title);
      formdata.append('description', postData.description);
      formdata.append('meta_title', postData.meta_title);
      formdata.append('slug', postData.slug);
      formdata.append('meta_description', postData.meta_description);
      formdata.append('published_at', postData.published_at);
      formdata.append('image', postData.image[0], postData.image[0].name);
      const response = await postService.createpost(formdata);
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
      formdata.append('title', postData.post.title);
      formdata.append('description', postData.post.description);
      formdata.append('meta_title', postData.post.meta_title);
      formdata.append('slug', postData.post.slug);
      formdata.append('published_at', postData.post.published_at);
      formdata.append('meta_description', postData.post.meta_description);
      if (postData.post.image[0] instanceof File) {
        formdata.append(
          'image',
          postData.post.image[0],
          postData.post.image[0].name
        );
      }
      formdata.append('_method', 'PUT');
      const response = await postService.updatepost(formdata, postData.slug);
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
        state.postTitle = action.payload.data.title;
        state.postMeta_title = action.payload.data.meta_title;
        state.postMeta_description = action.payload.data.meta_description;
        state.postDescription = action.payload.data.description;
        state.postPublished = action.payload.data.published_at;
        state.postImage = action.payload.data.image;
        state.postSlug = action.payload.data.slug;
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
