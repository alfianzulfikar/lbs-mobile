import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {KYCStep} from '../constants/Types';

export interface UserType {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  kycStatus: boolean | null;
  image: string;
  canBeCalled: boolean;
  kycStep?: KYCStep;
}

const initialState: UserType = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  kycStatus: false,
  image: '',
  canBeCalled: false,
  kycStep: 'KYCPersonal',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
      state.image = action.payload.image;
      state.kycStatus = action.payload.kycStatus;
      state.canBeCalled = action.payload.canBeCalled;
    },
    setCanBeCall: (state, action: PayloadAction<true | false>) => {
      state.canBeCalled = action.payload;
    },
    setKYCStep: (state, action: PayloadAction<KYCStep>) => {
      state.kycStep = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, setCanBeCall, setKYCStep} = userSlice.actions;

export default userSlice.reducer;
