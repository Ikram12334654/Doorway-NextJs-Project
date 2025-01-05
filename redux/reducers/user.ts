import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  steps: number;
  _id: string;
  role: string;
  accountType: string;
  passType: string;
  prefix: string;
  sufix: string;
  firstName: string;
  lastName: string;
  photo: string;
  emails: string[];
  phones: string[];
  URLS: string[];
  addresses: string[];
  jobTitle: string;
  organizationName: string;
}

const initialState: UserState = {
  steps: 0,
  _id: "",
  role: "",
  prefix: "",
  sufix: "",
  accountType: "",
  passType: "",
  firstName: "",
  lastName: "",
  photo: "",
  emails: [],
  phones: [],
  URLS: [],
  addresses: [],
  jobTitle: "",
  organizationName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveCurrentUser: (state, action: PayloadAction<Partial<UserState>>) => {
      const {
        steps,
        _id,
        role,
        accountType,
        passType,
        firstName,
        lastName,
        emails,
        URLS,
        addresses,
        phones,
        photo,
        jobTitle,
        prefix,
        sufix,
        organizationName,
      } = action.payload;

      if (steps !== undefined) state.steps = steps;
      if (_id !== undefined) state._id = _id;
      if (prefix !== undefined) state.prefix = prefix;
      if (sufix !== undefined) state.sufix = sufix;
      if (role !== undefined) state.role = role;
      if (accountType !== undefined) state.accountType = accountType;
      if (passType !== undefined) state.passType = passType;
      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (emails !== undefined) state.emails = emails;
      if (phones !== undefined) state.phones = phones;
      if (URLS !== undefined) state.URLS = URLS;
      if (addresses !== undefined) state.addresses = addresses;
      if (photo !== undefined) state.photo = photo;
      if (jobTitle !== undefined) state.jobTitle = jobTitle;
      if (organizationName !== undefined)
        state.organizationName = organizationName;
    },
    clearCurrentUser: (state) => {
      state.steps = 0;
      state._id = "";
      state.role = "";
      state.prefix = "";
      state.sufix = "";
      state.accountType = "";
      state.passType = "";
      state.firstName = "";
      state.lastName = "";
      state.emails = [];
      state.phones = [];
      state.URLS = [];
      state.addresses = [];
      state.photo = "";
      state.jobTitle = "";
      state.organizationName = "";
    },
  },
});

export const { saveCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
