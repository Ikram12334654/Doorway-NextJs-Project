import { authRoutes } from "@/assets/api";
import OrganizationHome from "@/component/organization/home";
import PersonalHome from "@/component/personal/home";
import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { createApplePass, generateApplePassUrl } from "@/utils/security";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const qrDownloadUrl = generateApplePassUrl(state.user._id);

  const uploadFileToDownload = async (file: File) => {
    try {
      if (file.type !== "application/vnd.apple.pkpass") {
        ErrorToastMessage({ message: "Only .pkpass files are allowed" });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", state.user._id);

      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      return;
    }
  };

  const checkAppleWalletFile = async (_id: string) => {
    try {
      const res = await fetch(`/api/check-file?userId=${_id}`, {
        method: "GET",
      });

      if (res.status === 400) {
        createApplePass({
          accessToken: state.auth.accessToken,
          onChanged(value) {
            setLoading(value);
          },
          onSuccess(file) {
            uploadFileToDownload(file);
          },
        });
      }
    } catch (error) {
      return;
    }
  };

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const generateGooglePassUrl = async () => {
    try {
      setLoading(true);
      const authToken = state.auth.accessToken;
      const { response, error }: ApiResponse = await Api(
        authRoutes.googleWalletPass,
        "get",
        {},
        authToken
      );

      setLoading(false);

      if (response) {
        dispatch(saveUser({ googleWalletUrl: response?.url }));

        console.log(JSON.stringify(response, null, 2));
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user.passType === enums.PASS_VIEW.APPLE) {
      checkAppleWalletFile(state.user._id);
    } else if (state.user.passType === enums.PASS_VIEW.ANDROID) {
      if (!state.user.googleWalletUrl) {
        generateGooglePassUrl();
      }
    }
  }, []);

  return (
    <>
      {state.account.type === enums.ACCOUNT_TYPE.PERSONAL && (
        <PersonalHome loading={loading} qrDownloadUrl={qrDownloadUrl} />
      )}
      {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
        <OrganizationHome loading={loading} qrDownloadUrl={qrDownloadUrl} />
      )}
    </>
  );
}

export default Home;
