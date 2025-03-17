import { RootState } from "@/redux/store";
import { vcfText } from "@/utils/utils";
import { QRCodeCanvas } from "qrcode.react";
import React from "react";
import { useSelector } from "react-redux";
interface QRCodeProps {
  size?: number;
}
const QRCode: React.FC<QRCodeProps> = ({ size = 128 }) => {
  const state = useSelector((state: RootState) => state);

  return (
    <QRCodeCanvas
      value={vcfText({
        prefix: state.user.prefix,
        suffix: state.user.suffix,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        organizationName: state.user.organizationName,
        emails: state.user.emails,
        phones: state.user.phones,
        jobTitle: state.user.jobTitle,
        photo: state.user.profileImage,
        URLS: state.user.URLs,
        addresses: state.user.addresses,
        personal: state.user.role === 1 ? true : false,
      })}
      size={size}
    />
  );
};

export default QRCode;
