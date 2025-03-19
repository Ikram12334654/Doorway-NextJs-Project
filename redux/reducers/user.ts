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
  suffix: string;
  profileImage: string;
  jobTitle: string;
  passType: string;
  passStatus: string;
  firstName: string;
  lastName: string;
  email: string;
  steps: number;
  aboutUs: string;
  emails: ContactInfo[];
  phones: ContactInfo[];
  URLs: ContactInfo[];
  addresses: ContactInfo[];
  country: string;
  accountType?: string;
  organizationName?: string;
}

const initialState: UserState = {
  _id: "",
  active: true,
  role: 0,
  prefix: "",
  suffix: "",
  profileImage: "",
  jobTitle: "",
  passType: "",
  passStatus: "",
  firstName: "",
  lastName: "",
  email: "",
  steps: 0,
  aboutUs: "",
  emails: [],
  phones: [],
  URLs: [],
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
