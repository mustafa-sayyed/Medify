import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  authStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
    },
    logout: (state, action) => {
      state.authStatus = false;
      state.userData = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
