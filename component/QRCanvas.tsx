import LoadingSpinner from "@/assets/LoadingSpinner";
import { RootState } from "@/redux/store";
import { vcfText } from "@/utils/utils";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { useSelector } from "react-redux";
interface QRCodeProps {
  url?: string;
  data?: any;
  size?: number;
  loading?: boolean;
}
const QRCode: React.FC<QRCodeProps> = ({ data, size = 128, url, loading }) => {
  const state = useSelector((state: RootState) => state);

  const values = {
    prefix: data?.prefix || state.user.prefix,
    suffix: data?.suffix || state.user.sufix,
    firstName: data?.firstName || state.user.firstName,
    lastName: data?.lastName || state.user.lastName,
    organizationName: data?.organizationName || state.account.organizationName,
    emails:
      data?.emails?.map((e: any) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })) ||
      state.user.emails?.map((e) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })),
    phones:
      data?.phones?.map((e: any) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })) ||
      state.user.phones?.map((e) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })),
    jobTitle: data?.jobTitle || state.user.jobTitle,
    URLS:
      data?.urls?.map((e: any) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })) ||
      state.user.urls?.map((e) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })),
    addresses:
      data?.addresses?.map((e: any) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })) ||
      state.user.addresses?.map((e) => ({
        type: e?.type || "WORK",
        value: e?.value || "",
      })),
    personal: state.user.role === 1 ? true : false,
  };

  return (
    <div className="relative flex justify-center items-center w-fit mx-auto p-4 rounded-lg border border-gray-200 shadow-md bg-white">
      <div
        className={`transition-all duration-300 rounded ${
          loading ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        <QRCodeCanvas
          value={
            url ||
            vcfText({
              data: values,
            })
          }
          size={size}
        />
      </div>
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white/80 backdrop-blur-sm rounded-lg px-3 py-3 text-center">
          <div className="flex items-start max-w-full">
            <div className="flex-shrink-0 mr-2 mt-1">
              <LoadingSpinner />
            </div>
            <div className="flex flex-wrap text-left text-sm font-semibold text-gray-700 break-words max-w-[calc(100%-40px)]">
              Please wait, generating your pass...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCode;
