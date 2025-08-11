import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface GlobalErrorType {
  showNetworkError?: boolean;
  showRootError?: boolean;
  showAlert?: boolean;
  title?: string;
  desc?: string;
  type?: string;
  alertButtonText?: string;
  alertButtonAction?: 'open-settings';
}

const initialState: GlobalErrorType = {
  showNetworkError: false,
  showRootError: false,
  showAlert: false,
  title: '',
  desc: '',
  type: 'info',
  alertButtonText: '',
  alertButtonAction: undefined,
};

export const globalError = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setShowNetworkError: (state, action: PayloadAction<GlobalErrorType>) => {
      state.showNetworkError = action.payload.showNetworkError;
      state.title = action.payload.title || '';
      state.desc = action.payload.desc || '';
    },
    setShowRootError: (state, action: PayloadAction<GlobalErrorType>) => {
      state.showRootError = action.payload.showRootError;
    },
    setAlert: (state, action: PayloadAction<GlobalErrorType>) => {
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.type = action.payload.type;
      state.showAlert = action.payload.showAlert;
      state.alertButtonText = action.payload.alertButtonText;
      state.alertButtonAction = action.payload.alertButtonAction;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
  },
});

export const {setShowNetworkError, setShowRootError, setAlert, setShowAlert} =
  globalError.actions;

export default globalError.reducer;
