import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactInfo {
  type: string;
  value: string;
}
interface AccountState {
  _id: string;
  creator: string;
  type: string;
  maxDoorway: number;
  organizationName: string;
  organizationURL: ContactInfo[];
  autoResendInvites: boolean;
}

const initialState: AccountState = {
  _id: "",
  creator: "",
  type: "",
  maxDoorway: 0,
  organizationName: "",
  organizationURL: [],
  autoResendInvites: false,
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
