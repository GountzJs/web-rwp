import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: sessionStorage.getItem('token'),
  },
  reducers: {
    reset: (state) => {
      state.value = sessionStorage.getItem('token');
    },
  },
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
