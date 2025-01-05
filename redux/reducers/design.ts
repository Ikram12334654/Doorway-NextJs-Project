import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface DesignState {
  name?: string;
  default?: boolean;
  backgroundColor?: string;
  logoImage?: string;
  stripImage?: string;
}

const initialState: DesignState = {
  name: "",
  default: false,
  backgroundColor: "",
  logoImage: "",
  stripImage: "",
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    saveCurrentDesign: (
      state,
      action: PayloadAction<{
        name: string;
        default: boolean;
        backgroundColor: string;
        logoImage: string;
        stripImage: string;
      }>
    ) => {
      const {
        name,
        default: isDefault,
        backgroundColor,
        logoImage,
        stripImage,
      } = action.payload;

      state.name = name;
      state["default"] = isDefault;
      state.backgroundColor = backgroundColor;
      state.logoImage = logoImage;
      state.stripImage = stripImage;
    },

    clearCurrentDesign: (state) => {
      state.name = "";
      state["default"] = false;
      state.backgroundColor = "";
      state.logoImage = "";
      state.stripImage = "";
    },
  },
});

export const { saveCurrentDesign, clearCurrentDesign } = designSlice.actions;

export default designSlice.reducer;
