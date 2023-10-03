import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

import structureService from './structuresService';
import { language } from '../../Language/languages';

const initialState = {
  structures: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const getstructures = createAsyncThunk(
  'structures/get-structures',
  async (thunkAPI) => {
    try {
      return await structureService.getstructures();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAstructure = createAsyncThunk(
  'structures/get-structure',
  async (id, thunkAPI) => {
    try {
      return await structureService.getstructure(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteAstructure = createAsyncThunk(
  'structures/delete-structure',
  async (id, thunkAPI) => {
    try {
      return await structureService.deletestructure(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAstructure = createAsyncThunk(
  'structures/create-structure',
  async (structureData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append('active', structureData.values.active);
      formdata.append(
        'image',
        structureData.values.image[0],
        structureData.values.image[0].name
      );
      formdata.append('profession', structureData.values.profession);
      formdata.append('name', structureData.values.name);
      const response = await structureService.createstructure(formdata);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAstructure = createAsyncThunk(
  'structures/update-structure',
  async (structureData, thunkAPI) => {
    console.log(structureData);
    try {
      const formdata = new FormData();
      formdata.append('active', structureData.structureData.active);
      formdata.append('name', structureData.structureData.name);
      if (structureData.structureData.image[0] instanceof File) {
        formdata.append(
          'image',
          structureData.structureData.image[0],
          structureData.structureData.image[0].name
        );
      }
      formdata.append('profession', structureData.structureData.profession);
      formdata.append('_method', 'PUT');

      const response = await structureService.updatestructure(
        formdata,
        structureData.id,
        structureData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction('Reset_all');

export const structuresSlice = createSlice({
  name: 'structures',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getstructures.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getstructures.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.structures = action.payload;
      })
      .addCase(getstructures.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(createAstructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAstructure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdStructure = action.payload;
      })
      .addCase(createAstructure.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(getAstructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAstructure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.StructurData = action.payload;
        state.structureActive = action.payload[language[0]].data.active;
        state.structureImage = action.payload[language[0]].data.image;
      })
      .addCase(getAstructure.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateAstructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAstructure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedStructure = action.payload;
      })
      .addCase(updateAstructure.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(deleteAstructure.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAstructure.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedStructure = action.payload;
      })
      .addCase(deleteAstructure.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default structuresSlice.reducer;
