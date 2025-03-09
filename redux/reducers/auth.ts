import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },

    logout: () => initialState,
  },
});

export const { saveAuth, logout } = authSlice.actions;

export default authSlice.reducer;
