import { persistor, RootState, store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Logout from "./Component/logoutModal";

const AppInner = ({ Component, pageProps }: AppProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <Component {...pageProps} />
      <Toaster />
      <Logout />
    </>
  );
};

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInner Component={Component} pageProps={pageProps} router={router} />
      </PersistGate>
    </Provider>
  );
}
