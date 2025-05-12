import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ColorSchemeState {
  colorScheme: 'light' | 'dark';
}

const initialState: ColorSchemeState = {
  colorScheme: 'light',
};

export const colorSchemeSlice = createSlice({
  name: 'colorScheme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.colorScheme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setColorScheme} = colorSchemeSlice.actions;

export default colorSchemeSlice.reducer;
