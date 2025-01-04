import "@/styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import type { AppProps } from "next/app";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}
