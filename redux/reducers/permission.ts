import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PermissionState {
  prefix: boolean;
  sufix: boolean;
  firstName: boolean;
  lastName: boolean;
  organizationName: boolean;
  jobTitle: boolean;
  phones: boolean;
  urls: boolean;
  emails: boolean;
}

const initialState: PermissionState = {
  prefix: false,
  sufix: false,
  firstName: false,
  lastName: false,
  organizationName: false,
  jobTitle: false,
  phones: false,
  urls: false,
  emails: false,
};

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    savePermission: (
      state,
      action: PayloadAction<Partial<PermissionState>>
    ) => {
      Object.keys(action.payload).forEach((key) => {
        if (key in initialState) {
          (state as any)[key] = (action.payload as any)[key];
        }
      });
    },
    clearPermission: () => initialState,
  },
});

export const { savePermission, clearPermission } = permissionSlice.actions;
export default permissionSlice.reducer;
