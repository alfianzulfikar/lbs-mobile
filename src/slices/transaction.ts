import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface TransactionType {
  paymentCode: string;
}

const initialState: TransactionType = {
  paymentCode: '',
};

export const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    setPaymentCode: (state, action: PayloadAction<TransactionType>) => {
      state.paymentCode = action.payload.paymentCode;
    },
  },
});

export const {setPaymentCode} = transactionSlice.actions;

export default transactionSlice.reducer;
