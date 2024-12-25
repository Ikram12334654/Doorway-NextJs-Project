import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  loggedIn: boolean;
}

const initialState: AuthState = {
  token: "",
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;

      state.token = token;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.token = "";
      state.loggedIn = false;
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;

export default authSlice.reducer;
