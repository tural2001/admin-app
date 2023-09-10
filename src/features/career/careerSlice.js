import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import careerService from './careerService';

const initialState = {
  careers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getcareers = createAsyncThunk(
  'careers/get-careers',
  async (thunkAPI) => {
    try {
      return await careerService.getcareers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAcareer = createAsyncThunk(
  'careers/get-career',
  async (id, thunkAPI) => {
    try {
      return await careerService.getcareer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAcareer = createAsyncThunk(
  'careers/delete-career',
  async (id, thunkAPI) => {
    try {
      return await careerService.deletecareer(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAcareer = createAsyncThunk(
  'careers/create-career',
  async (careerData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('phone', careerData.phone);
      formdata.append('cv', careerData.cv[0], careerData.cv[0].name);
      formdata.append('name', careerData.name);
      formdata.append('email', careerData.email);
      formdata.append('vacancy', careerData.vacancy);
      formdata.append('notes', careerData.notes);
      const response = await careerService.createcareer(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAcareer = createAsyncThunk(
  'careers/update-career',
  async (careerData, thunkAPI) => {
    console.log(careerData);
    try {
      const formdata = new FormData();
      formdata.append('phone', careerData.career.phone);
      formdata.append('name', careerData.career.name);
      if (careerData.career.cv[0] instanceof File) {
        formdata.append(
          'cv',
          careerData.career.cv[0],
          careerData.career.cv[0].name
        );
      }
      formdata.append('email', careerData.career.email);
      formdata.append('notes', careerData.career.notes);
      formdata.append('vacancy', careerData.career.vacancy);
      formdata.append('_method', 'PUT');
      const response = await careerService.updatecareer(
        formdata,
        careerData.id
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const careerSlice = createSlice({
  name: 'careers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getcareers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getcareers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.careers = action.payload;
      })
      .addCase(getcareers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAcareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAcareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdcareer = action.payload;
      })
      .addCase(createAcareer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAcareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAcareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.careerName = action.payload.data.name;
        state.careerPhone = action.payload.data.phone;
        state.careerEmail = action.payload.data.email;
        state.careerCv = action.payload.data.cv;
        state.careerNotes = action.payload.data.notes;
        state.careerVancancy = action.payload.data.vacancy_name;
      })
      .addCase(getAcareer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAcareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAcareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedcareer = action.payload;
      })
      .addCase(updateAcareer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAcareer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAcareer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedcareer = action.payload;
      })
      .addCase(deleteAcareer.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default careerSlice.reducer;
