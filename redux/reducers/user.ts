import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContactInfo {
  type: string;
  value: string;
}

interface UserState {
  _id: string;
  active: boolean;
  role: number;
  prefix: string;
  sufix: string;
  profileImage: string;
  doorwayName: string;
  jobTitle: string;
  passType: string;
  passStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  steps: number;
  aboutUs: string;
  googleWalletUrl: string;
  emails: ContactInfo[];
  phones: ContactInfo[];
  urls: ContactInfo[];
  addresses: ContactInfo[];
  country: string;
}

const initialState: UserState = {
  _id: "",
  active: true,
  role: 0,
  prefix: "",
  sufix: "",
  profileImage: "",
  doorwayName: "",
  jobTitle: "",
  passType: "",
  passStatus: "",
  firstName: "",
  lastName: "",
  email: "",
  steps: 0,
  aboutUs: "",
  googleWalletUrl: "",
  emails: [],
  phones: [],
  urls: [],
  addresses: [],
  country: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },
    clearUser: () => initialState,
  },
});

export const { saveUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
