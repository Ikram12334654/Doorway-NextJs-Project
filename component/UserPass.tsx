import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ApplePass from "./common/applePass";
import GooglePass from "./common/googlePass";

interface ContactInfo {
  type: string;
  value: string;
}
interface formValues {
  prefix?: string;
  sufix?: string;
  jobTitle?: string;
  organizationName?: string;
  organizationURL?: string;
  backgroundColor?: string;
  stripImage?: string;
  logoImage?: string;
  firstName?: string;
  lastName?: string;
  passType?: string;
  emails?: ContactInfo[];
  phones?: ContactInfo[];
  urls?: ContactInfo[];
  addresses?: ContactInfo[];
}

const UserPass: React.FC<{ values?: formValues }> = ({ values }) => {
  const state = useSelector((state: RootState) => state);

  const [type, setType] = useState(
    values?.passType || state.user.passType || enums.PASS_VIEW.APPLE
  );

  const data = {
    prefix: values?.prefix || state.user.prefix || "",
    suffix: values?.sufix || state.user.sufix || "",
    jobTitle:
      values?.jobTitle?.toUpperCase() || state.user.jobTitle || "DESIGNATION",
    organizationName:
      values?.organizationName || state.account.organizationName || "Doorway",
    organizationURL:
      values?.organizationURL ||
      state.account.organizationURL ||
      "https://doorway.io/",
    backgroundColor:
      values?.backgroundColor || state.design.backgroundColor || "#22242C",
    stripImage: values?.stripImage || state.design.stripImage || "",
    logoImage: values?.logoImage || state.design.logoImage || "",
    firstName: values?.firstName || state.user.firstName || "",
    lastName: values?.lastName || state.user.lastName || "",
    emails:
      values?.emails?.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      state.user.emails.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      [],
    phones:
      values?.phones?.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      state.user.phones.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      [],
    urls:
      values?.urls?.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      state.user.urls.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      [],
    addresses:
      values?.addresses?.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      state.user.addresses.map((e) => ({
        type: e?.type,
        value: e?.value,
      })) ||
      [],
  };

  useEffect(() => {
    setType(values?.passType || state.user.passType || enums.PASS_VIEW.APPLE);
  }, [state.user.passType]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={"width: 360px max-width: 100% min-width: 300px"}>
          <div className="block">
            {type === enums.PASS_VIEW.APPLE && <ApplePass values={data} />}
            {type === enums.PASS_VIEW.ANDROID && <GooglePass values={data} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPass;
