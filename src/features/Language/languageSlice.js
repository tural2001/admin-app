// features/Language/languageSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'az', // Default language is Azerbaijani (az).
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;
