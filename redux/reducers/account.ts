import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  _id: string;
  creator: string;
  type: string;
  organizationName: string;
  organizationURL: string;
}

const initialState: AccountState = {
  _id: "",
  creator: "",
  type: "",
  organizationName: "",
  organizationURL: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    saveAccount: (state, action: PayloadAction<Partial<AccountState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },
    clearAccount: () => initialState,
  },
});

export const { saveAccount, clearAccount } = accountSlice.actions;
export default accountSlice.reducer;
