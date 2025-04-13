import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountSlice from "./reducers/account";
import designSlice from "./reducers/design";
import authSlice from "./reducers/auth";
import userSlice from "./reducers/user";
import subscriptionSlice from "./reducers/subscription";
import permissionSlice from "./reducers/permission";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  account: accountSlice,
  design: designSlice,
  permission: permissionSlice,
  subscription: subscriptionSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
