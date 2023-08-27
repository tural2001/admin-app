import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import userService from './usersService';

const initialState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getusers = createAsyncThunk('users/get-user', async (thunkAPI) => {
  try {
    return await userService.getusers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAuser = createAsyncThunk(
  'user/get-user',
  async (id, thunkAPI) => {
    try {
      return await userService.getuser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAuser = createAsyncThunk(
  'user/delete-user',
  async (id, thunkAPI) => {
    try {
      return await userService.deleteuser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAuser = createAsyncThunk(
  'user/create-user',
  async (userData, thunkAPI) => {
    try {
      return await userService.createuser(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAuser = createAsyncThunk(
  'user/update-user',
  async (user, thunkAPI) => {
    try {
      return await userService.updateuser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction('Reset_all');

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.users = action.payload;
      })
      .addCase(getusers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
      })
      .addCase(createAuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userName = action.payload.data.name;
        state.userEmail = action.payload.data.email;
        state.userPassword = action.payload.data.password;
      })
      .addCase(getAuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedUser = action.payload;
      })
      .addCase(updateAuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAuser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAuser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedUser = action.payload;
      })
      .addCase(deleteAuser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
