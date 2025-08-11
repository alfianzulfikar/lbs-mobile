import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface BusinessViewTypeType {
  viewType: 'vertical' | 'horizontal';
}

const initialState: BusinessViewTypeType = {
  viewType: 'vertical',
};

export const businessViewTypeSlice = createSlice({
  name: 'businessViewTypeSlice',
  initialState,
  reducers: {
    setViewType: (state, action: PayloadAction<BusinessViewTypeType>) => {
      state.viewType = action.payload.viewType;
    },
  },
});

export const {setViewType} = businessViewTypeSlice.actions;

export default businessViewTypeSlice.reducer;
