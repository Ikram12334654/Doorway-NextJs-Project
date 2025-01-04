import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string;
  loggedInFromAnyOtherLocation: boolean;
}

const initialState: AuthState = {
  token: "",
  loggedInFromAnyOtherLocation: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuthToken: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;

      state.token = token;
    },

    setLoggedInFromAnyOtherLocation: (
      state,
      action: PayloadAction<{ loggedInFromAnyOtherLocation: boolean }>
    ) => {
      const { loggedInFromAnyOtherLocation } = action.payload;

      state.loggedInFromAnyOtherLocation = loggedInFromAnyOtherLocation;
    },
    logout: (state) => {
      state.token = "";
      state.loggedInFromAnyOtherLocation = false;
    },
  },
});

export const { saveAuthToken, setLoggedInFromAnyOtherLocation, logout } =
  authSlice.actions;

export default authSlice.reducer;
