import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface DesignState {
  _id: string;
  name: string;
  backgroundColor: string;
  logoImage: string;
  stripImage: string;
}

const initialState: DesignState = {
  _id: "",
  name: "",
  backgroundColor: "",
  logoImage: "",
  stripImage: "",
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    saveDesign: (state, action: PayloadAction<Partial<DesignState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },

    clearDesign: () => initialState,
  },
});

export const { saveDesign, clearDesign } = designSlice.actions;

export default designSlice.reducer;
