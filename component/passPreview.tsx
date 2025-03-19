import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplePass from "./applePass";
import GooglePass from "./googlePass";

interface formValues {
  jobTitle?: string;
  organizationName?: string;
  organizationURL?: string;
  backgroundColor?: string;
  stripImage?: string;
  logoImage?: string;
  firstName?: string;
  lastName?: string;
}

const PassPreview: React.FC<{ values?: formValues }> = ({ values }) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [passType, setPassType] = useState(
    state.user.passType || enums.PASS_VIEW.APPLE
  );

  const data = {
    jobTitle:
      values?.jobTitle?.toUpperCase() || state.user.jobTitle || "DESIGNATION",
    organizationName:
      values?.organizationName || state.user.organizationName || "Doorway",
    organizationURL:
      values?.organizationURL || state.user.URLs[0] || "https://doorway.io/",
    backgroundColor:
      values?.backgroundColor || state.design.backgroundColor || "#22242C",
    stripImage: values?.stripImage || state.design.stripImage || "",
    logoImage: values?.logoImage || state.design.logoImage || "",
    firstName: values?.firstName || state.user.firstName || "",
    lastName: values?.lastName || state.user.lastName || "",
  };

  useEffect(() => {
    setPassType(state.user.passType || enums.PASS_VIEW.APPLE);
  }, [state.user.passType]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={"width: 360px max-width: 100% min-width: 300px"}>
          <div className="block">
            {passType === enums.PASS_VIEW.APPLE && <ApplePass values={data} />}
            {passType === enums.PASS_VIEW.ANDROID && (
              <GooglePass values={data} />
            )}
            {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
              <div className="flex mt-[12px] justify-center gap-[22px] text-[10px] font-[500]">
                <span
                  className={`cursor-pointer ${
                    passType === enums.PASS_VIEW.APPLE
                      ? "text-black underline"
                      : "text-[#BEBEBE]"
                  }`}
                  onClick={() => {
                    setPassType(enums.PASS_VIEW.APPLE);
                    dispatch(saveUser({ passType: enums.PASS_VIEW.APPLE }));
                  }}
                >
                  {enums.PASS_VIEW.APPLE}
                </span>
                <span
                  className={`cursor-pointer ${
                    passType === enums.PASS_VIEW.ANDROID
                      ? "text-black underline"
                      : "text-[#BEBEBE]"
                  }`}
                  onClick={() => {
                    setPassType(enums.PASS_VIEW.ANDROID);
                    dispatch(
                      saveUser({
                        passType: enums.PASS_VIEW.ANDROID,
                      })
                    );
                  }}
                >
                  {enums.PASS_VIEW.ANDROID}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassPreview;
