import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface RegistrationState {
  steps: number;
  accountType: string;
  passType: string;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  organizationName: string;
  organizationURL: string;
  backgroundColor: string;
  stripeImage: File|null,
  topLeftLogo:File|null,
  paymentCancle:boolean
}

const initialState: RegistrationState = {
  steps: 2,
  accountType: "",
  passType: "",
  firstName: "",
  lastName: "",
  email: "",
  jobTitle: "",
  organizationName: "",
  organizationURL: "",
  backgroundColor: "",
  stripeImage: null,
  topLeftLogo: null,
  paymentCancle:false
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    saveRegistration: (
      state,
      action: PayloadAction<Partial<RegistrationState>>
    ) => {
      const {
        steps,
        accountType,
        passType,
        firstName,
        lastName,
        email,
        jobTitle,
        organizationName,
        organizationURL,
        backgroundColor,
        stripeImage,
        topLeftLogo,
        paymentCancle,
      } = action.payload;

      if (steps !== undefined) state.steps = steps;
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
      if(stripeImage !==undefined)
        state.stripeImage = stripeImage;
      if(topLeftLogo !== undefined)
        state.topLeftLogo=topLeftLogo
      if(paymentCancle !== undefined)
        state.paymentCancle=paymentCancle
    },
    clearRegistration: (state) => {
      state.steps = 0;
      state.accountType = "";
      state.passType = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.jobTitle = "";
      state.organizationName = "";
      state.organizationURL = "";
      state.stripeImage = null,
      state.topLeftLogo=null
    },
  },
});

export const { saveRegistration, clearRegistration } =
  registrationSlice.actions;

export default registrationSlice.reducer;
