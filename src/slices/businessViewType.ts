import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface BusinessViewType {
  viewType: 'vertical' | 'horizontal';
}

const initialState: BusinessViewType = {
  viewType: 'vertical',
};

export const businessViewType = createSlice({
  name: 'businessViewType',
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<BusinessViewType>) => {
      state.viewType = action.payload.viewType;
    },
  },
});

export const {setViewType} = businessViewType.actions;

export default businessViewType.reducer;
