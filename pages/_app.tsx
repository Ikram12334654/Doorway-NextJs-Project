import Logout from "@/component/logoutModal";
import { saveAccount } from "@/redux/reducers/account";
import { saveDesign } from "@/redux/reducers/design";
import { savePermission } from "@/redux/reducers/permission";
import { saveUser } from "@/redux/reducers/user";
import { persistor, RootState, store } from "@/redux/store";
import "@/styles/globals.css";
import { SOCKET } from "@/utils/socket";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
const AppInner = ({ Component, pageProps }: AppProps) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    SOCKET.on(`user-${state.user._id}`, (e) => {
      dispatch(saveUser(e?.user));
    });

    SOCKET.on(`account-${state.account._id}`, (e) => {
      dispatch(saveAccount(e?.account));
    });

    SOCKET.on(`design-${state.account._id}`, (e) => {
      dispatch(saveDesign(e?.design));
    });

    SOCKET.on(`permission-${state.account._id}`, (e) => {
      dispatch(savePermission(e?.permission));
    });

    SOCKET.on(`subscription-${state.account._id}`, (e) => {});

    return () => {
      SOCKET.off(`user-${state.user._id}`);
      SOCKET.off(`account-${state.account._id}`);
      SOCKET.off(`design-${state.account._id}`);
      SOCKET.off(`subscription-${state.account._id}`);
    };
  }, []);

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
