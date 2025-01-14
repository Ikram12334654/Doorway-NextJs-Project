import { setLoggedInFromAnyOtherLocation } from "@/redux/reducers/auth";
import { persistor, RootState, store } from "@/redux/store";
import "@/styles/globals.css";
import { decryptJSON } from "@/utils/security";
import { SOCKET } from "@/utils/socket";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Logout from "./Component/logoutModal";

const AppInner = ({ Component, pageProps }: AppProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const socketIo = () => {
    SOCKET.connect();

    SOCKET.emit("authenticate", {
      _id: state.user._id,
      token: decryptJSON(state.auth.token),
    });

    SOCKET.on(state.user._id, (data) => {
      if (data.status === 401) {
        dispatch(
          setLoggedInFromAnyOtherLocation({
            loggedInFromAnyOtherLocation: true,
          })
        );
      } else {
        console.log("data--->", JSON.stringify(data, null, 2));
      }
    });
  };

  useEffect(() => {
    if (state.auth.token) {
      console.log("token---->", JSON.stringify(state.auth.token));
      socketIo();
    }
  }, [state]);

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
