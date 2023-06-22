import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {
      username: sessionStorage.getItem('username'),
      image: sessionStorage.getItem('image'),
    },
  },
  reducers: {
    getUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUsername } = userSlice.actions;

export default userSlice.reducer;
