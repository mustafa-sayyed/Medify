import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authStatus: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.authStatus = false;
      state.user = {};
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
