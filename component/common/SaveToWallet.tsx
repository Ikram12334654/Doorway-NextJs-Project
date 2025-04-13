import { RootState } from "@/redux/store";
import { createApplePass, generateApplePassUrl } from "@/utils/security";
import { ErrorToastMessage } from "@/utils/toast";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../button";
import QRCode from "../QRCanvas";

function SaveToWallet() {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
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

  useEffect(() => {
    checkAppleWalletFile(state.user._id);
  }, []);

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
          <QRCode size={210} url={qrDownloadUrl} loading={loading} />
        </div>
        {
          <Link
            href={qrDownloadUrl}
            onClick={(e) => {
              if (loading) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className="text-[15px] text-electricGreen w-[240px] flex items-center justify-center mb-[26px]"
          >
            Download Apple Wallet file
          </Link>
        }
      </div>
      <div className="w-[170px]">
        <Button
          onClick={() => {
            router.push("/home");
          }}
        />
      </div>
    </div>
  );
}

export default SaveToWallet;
