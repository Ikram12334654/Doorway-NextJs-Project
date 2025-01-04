import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface UserState {
  steps: number;
  _id: string;
  role: string;
  accountType: string;
  passType: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  organizationName: string;
  organizationURL: string;
  backgroundColor: string;
}

const initialState: UserState = {
  steps: 0,
  _id: "",
  role: "",
  accountType: "",
  passType: "",
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  organizationName: "",
  organizationURL: "",
  backgroundColor: "",
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
        email,
        jobTitle,
        organizationName,
        organizationURL,
        backgroundColor,
      } = action.payload;

      if (steps !== undefined) state.steps = steps;
      if (_id !== undefined) state._id = _id;
      if (role !== undefined) state.role = role;
      if (accountType !== undefined) state.accountType = accountType;
      if (passType !== undefined) state.passType = passType;
      if (firstName !== undefined) state.firstName = firstName;
      if (lastName !== undefined) state.lastName = lastName;
      if (email !== undefined) state.email = email;
      if (jobTitle !== undefined) state.jobTitle = jobTitle;
      if (organizationName !== undefined)
        state.organizationName = organizationName;
      if (organizationURL !== undefined)
        state.organizationURL = organizationURL;
      if (backgroundColor !== undefined)
        state.backgroundColor = backgroundColor;
    },
    clearCurrentUser: (state) => {
      state.steps = 0;
      state._id = "";
      state.role = "";
      state.accountType = "";
      state.passType = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.jobTitle = "";
      state.organizationName = "";
      state.organizationURL = "";
    },
  },
});

export const { saveCurrentUser, clearCurrentUser } = userSlice.actions;

export default userSlice.reducer;
