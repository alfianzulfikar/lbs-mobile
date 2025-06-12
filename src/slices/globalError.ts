import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GlobalErrorType {
  showNetworkError?: boolean;
  showAlert?: boolean;
  title?: string;
  desc?: string;
  type?: string;
}

const initialState: GlobalErrorType = {
  showNetworkError: false,
  showAlert: false,
  title: '',
  desc: '',
  type: 'info',
};

export const globalError = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setShowNetworkError: (state, action: PayloadAction<GlobalErrorType>) => {
      state.showNetworkError = action.payload.showNetworkError;
    },
    setAlert: (state, action: PayloadAction<GlobalErrorType>) => {
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.type = action.payload.type;
      state.showAlert = action.payload.showAlert;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
  },
});

export const {setShowNetworkError, setAlert, setShowAlert} =
  globalError.actions;

export default globalError.reducer;
