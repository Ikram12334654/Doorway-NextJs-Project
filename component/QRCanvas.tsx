import { RootState } from "@/redux/store";
import { vcfText } from "@/utils/utils";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { useSelector } from "react-redux";
interface QRCodeProps {
  url?: string;
  data?: any;
  size?: number;
}
const QRCode: React.FC<QRCodeProps> = ({ data, size = 128, url }) => {
  const state = useSelector((state: RootState) => state);

  const values = {
    prefix: data?.prefix || state.user.prefix,
    suffix: data?.suffix || state.user.suffix,
    firstName: data?.firstName || state.user.firstName,
    lastName: data?.lastName || state.user.lastName,
    organizationName: data?.organizationName || state.user.organizationName,
    emails: state.user.emails.map((e) => ({
      type: e?.type || "WORK",
      value: e?.value || "",
    })),
    phones: state.user.phones.map((e) => ({
      type: e?.type || "WORK",
      value: e?.value || "",
    })),
    jobTitle: data?.jobTitle || state.user.jobTitle,
    URLS: state.user.URLs.map((e) => ({
      type: e?.type || "WORK",
      value: e?.value || "",
    })),
    addresses: state.user.addresses.map((e) => ({
      type: e?.type || "WORK",
      value: e?.value || "",
    })),
    personal: state.user.role === 1 ? true : false,
  };

  return (
    <QRCodeCanvas
      value={
        url ||
        vcfText({
          data: values,
        })
      }
      size={size}
    />
  );
};

export default QRCode;
