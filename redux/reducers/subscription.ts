import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SubscriptionState {
  accessToken: string;
  refreshToken: string;
}

const initialState: SubscriptionState = {
  accessToken: "",
  refreshToken: "",
};

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    saveSubscription: (
      state,
      action: PayloadAction<Partial<SubscriptionState>>
    ) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },

    clearSubscription: () => initialState,
  },
});

export const { saveSubscription, clearSubscription } =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;
