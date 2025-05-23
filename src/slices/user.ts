import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface UserType {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  kycStatus: boolean | null;
  image: string;
}

const initialState: UserType = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  kycStatus: false,
  image: '',
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
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;

export default userSlice.reducer;
