import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRImage from "../../public/QrImage.png";
import DefaultLogo from "./defaultLogo";
import QRCode from "./QRCanvas";

interface formValues {
  jobTitle?: string;
  organizationName?: string;
  organizationURL?: string;
  backgroundColor?: string;
  stripImage?: string;
  logoImage?: string;
  firstName?: string;
  lastName?: string;
  passType?: string;
}

const UserPass: React.FC<{ values?: formValues }> = ({ values }) => {
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
    <div className="flex flex-col items-center ">
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={"width: 360px max-width: 100% min-width: 300px"}>
          <div className="block">
            {passType === enums.PASS_VIEW.APPLE && (
              <div className="max-width: 22.5rem relative">
                <div
                  className="visible w-[330px] shadow-lg text-white rounded-2xl"
                  style={{
                    backgroundColor: data.backgroundColor,
                  }}
                >
                  <div className="flex flex-col h-full justify-between pb-6">
                    <div className="mt-3 ml-3 w-2/6 ">
                      <span className="block w-6  mt-3 ml-3 w-2/6">
                        {data.logoImage ? (
                          <img
                            src={data?.logoImage}
                            alt="Logo Image"
                            className="w-[40px] h-auto m-auto"
                          />
                        ) : (
                          <DefaultLogo />
                        )}
                      </span>
                    </div>
                    <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
                      <span className="flex items-center w-full block aspect-[3/1]">
                        <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                          {data.stripImage ? (
                            <img
                              src={data?.stripImage}
                              alt="Strip Image"
                              className="max-w-full h-auto m-auto"
                            />
                          ) : (
                            "Doorway"
                          )}
                        </div>
                      </span>
                    </div>
                    <div className="mb-12">
                      <div className="px-6">
                        <p
                          className="text-mde uppercase"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          {data?.jobTitle}
                        </p>
                        <p
                          className="text-mde font-extralight"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          {data.firstName + " " + data.lastName || ""}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] py-2 px-2 flex justify-center items-center">
                      {state.user ? (
                        <QRCode />
                      ) : (
                        <Image
                          src={QRImage}
                          alt="Description"
                          width={128}
                          height={128}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {passType === enums.PASS_VIEW.ANDROID && (
              <div className="max-width: 22.5rem relative">
                <div
                  className="visible w-[330px] shadow-lg text-white rounded-[32px]"
                  style={{
                    backgroundColor: data.backgroundColor,
                  }}
                >
                  <div className="flex flex-col h-full justify-between pb-6">
                    <div className="mt-3 ml-3 w-2/6 ">
                      <span className="block w-6  mt-3 ml-3 w-2/6">
                        {data.logoImage ? (
                          <img
                            src={data?.logoImage}
                            alt="Logo Image"
                            className="w-[40px] h-auto m-auto"
                          />
                        ) : (
                          <DefaultLogo />
                        )}
                      </span>
                    </div>

                    <div className="mb-12">
                      <div className="px-6">
                        <p
                          className="mt-[24px] text-lg leading-[40px] font-normal font-[700]"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          {state.user.firstName + " " + state.user.lastName}
                        </p>
                        <p
                          className="mt-[16px] text-mde font-normal"
                          style={{ color: "rgb(255, 255, 255)" }}
                        >
                          {data?.jobTitle}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] py-2 px-2 flex justify-center items-center">
                      {state.user ? (
                        <QRCode />
                      ) : (
                        <Image
                          src={QRImage}
                          alt="Description"
                          width={128}
                          height={128}
                        />
                      )}
                    </div>
                    <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
                      <span className="flex items-center  w-full block aspect-[3/1]">
                        <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                          {!data.stripImage ? (
                            "Doorway"
                          ) : (
                            <img
                              src={data?.stripImage}
                              alt="Strip Image"
                              className="max-w-full h-auto m-auto"
                            />
                          )}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPass;
