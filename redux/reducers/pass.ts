import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface PassState {
  googlePass?: string;
  applePass?: ArrayBuffer;
}

const initialState: PassState = {
  googlePass: "",
  applePass: undefined,
};

export const PassSlice = createSlice({
  name: "pass",
  initialState,
  reducers: {
    savePass: (state, action: PayloadAction<Partial<PassState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },

    clearPass: () => initialState,
  },
});

export const { savePass, clearPass } = PassSlice.actions;

export default PassSlice.reducer;
