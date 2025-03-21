import { RootState } from "@/redux/store";
import { createApplePass } from "@/utils/security";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "./button";
import QRCode from "./QRCanvas";
import { useRouter } from "next/router";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";

function SaveToWallet() {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  const uploadFileToDownload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      SuccessToastMessage({ message: "Uploaded" });
    } else {
      ErrorToastMessage({ message: "Error Uploading" });
    }
  };

  useEffect(() => {
    if (!state.pass.applePass) {
      createApplePass({
        _id: state.user._id,
        // accountId: state.account._id,
        accountId: "dc6ef274-a88a-44bf-ac25-47515c65f568",
        onChanged(value) {
          setLoading(value);
        },
        onSuccess(file) {
          uploadFileToDownload(file);
        },
      });
    }
  }, []);

  const qrDownloadUrl = `http://192.168.2.194:3000/download/${token}`;

  return (
    <div className="flex flex-col items-center">
      <div className="block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Save to Wallet
      </div>

      <div className="block text-[16px] heading-[25px] mb-[38px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full">
        <div className="block min-md:hidden">
          Tap the button to save your Doorway to your Apple Wallet or Google Pay
        </div>
        <div className="hidden min-md:block">
          Scan the QR code to save your Doorway to your Apple Wallet or Google
          Pay
        </div>
      </div>
      <div className="flex-col items-center hidden min-md:flex">
        <div className="rounded-[8px] shadow-lg border w-[240px] h-[240px] p-[30px] flex items-center justify-center mb-[26px] ">
          <QRCode size={210} url={qrDownloadUrl} />
        </div>
        <a
          href={qrDownloadUrl}
          className="text-[15px] text-electricGreen w-[240px] flex items-center justify-center mb-[26px]"
        >
          Download Apple Wallet file
        </a>
      </div>
      <div className="w-[170px]">
        <Button
          onClick={() => {
            router.push("/personal/home");
          }}
        />
      </div>
    </div>
  );
}

export default SaveToWallet;
