import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
    isLoggined:false
  },
  reducers: {
    login: (state, action) => {
      console.log('Payload',action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggined=true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null; 
      state.isLoggined=false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectIsLoggined = (state) => state.user.isLoggined;

export default userSlice.reducer;
