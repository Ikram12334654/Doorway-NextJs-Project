import { persistor, RootState, store } from "@/redux/store";
import "@/styles/globals.css";
import { SOCKET } from "@/utils/socket";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Logout from "./Component/logoutModal";

const AppInner = ({ Component, pageProps }: AppProps) => {
  const state = useSelector((state: RootState) => state);

  const socketIo = () => {
    SOCKET.on("connection", () => {
      SOCKET.emit("authenticate", {
        _id: state.user._id,
        token: state.auth.token,
      });
      SOCKET.on(state.user._id, (data) => {
        console.log(data);
      });
    });
  };

  useEffect(() => {
    if (state.auth.token && !SOCKET.connected) {
      socketIo();

      return () => {
        SOCKET.off("connection");
      };
    }
  }, [state.auth.token]);

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
