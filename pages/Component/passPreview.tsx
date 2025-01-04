import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QRImage from "../../public/QrImage.png";
import { saveCurrentUser } from "@/redux/reducers/registration";

interface formValues {
  jobTitle?: string;
  organizationName?: string;
  organizationURL?: string;
  backgroundColor?: string;
  stripImage?: string;
  topLogoImage?: string;
}

const PassPreview: React.FC<{ values?: formValues }> = ({ values }) => {
  const svgIcon = `<svg
            version="1.1"
            id="Layer_1"
            height='128',
            width='128'
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 429.6 687.2"
          >
            <path
                d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                style={{
                    fill: 'none',
                    stroke: '#FFFFFF',
                    strokeWidth: 54,
                }}
            ></path>
            <path
                fill=""
                d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            ></path>
            <path
                fill="#FFFFFF"
                d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            ></path>
            <path
                fill="#FFFFFF"
                d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
            ></path>
          </svg>`;

  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [qrCode, setQrCode] = useState<string>("");
  const [passType, setPassType] = useState(
    state.user.passType || enums.PASS_VIEW.APPLE
  );
  // const stateStripeImage = state.registration.stripeImage
  //   ? URL.createObjectURL(state.registration.stripeImage)
  //   : null;
  // const statetopLeftImage = state.registration.topLeftLogo
  //   ? URL.createObjectURL(state.registration.topLeftLogo)
  //   : null;
  const data = {
    jobTitle:
      values?.jobTitle?.toUpperCase() || state.user.jobTitle || "DESIGNATION",
    organizationName:
      values?.organizationName || state.user.organizationName || "Doorway",
    organizationURL:
      values?.organizationURL ||
      state.user.organizationURL ||
      "https://doorway.io/",
    backgroundColor:
      values?.backgroundColor ||
      state.user.backgroundColor ||
      "rgb(34, 36, 44)",
    stripeImage: values?.stripImage,
    topLeftImage: values?.topLogoImage,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={`width:330px`}>
          <div className="block">
            {passType === enums.PASS_VIEW.APPLE && (
              <div className="max-w-[330px] relative">
                <div
                  className="visible w-[330px] shadow-lg text-white rounded-2xl"
                  style={{
                    backgroundColor: data.backgroundColor,
                  }}
                >
                  <div className="flex flex-col h-full justify-between pb-6">
                    <div className="mt-3 ml-3 w-1/6">
                      <span className="block w-6  mt-3 ml-3 w-1/6">
                        {data.topLeftImage === "" ? (
                          <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            viewBox="0 0 429.6 687.2"
                          >
                            <path
                              d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                              style={{
                                fill: "none",
                                stroke: "#FFFFFF",
                                strokeWidth: 54,
                              }}
                            ></path>
                            <path
                              fill=""
                              d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                              style={{
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                              }}
                            ></path>
                            <path
                              fill="#FFFFFF"
                              d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                              style={{
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                              }}
                            ></path>
                            <path
                              fill="#FFFFFF"
                              d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
                            ></path>
                          </svg>
                        ) : (
                          <img
                            src={data?.topLeftImage}
                            alt="top Image"
                            className="max-w-full h-auto m-auto"
                          />
                        )}
                      </span>
                    </div>
                    <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
                      <span className="flex items-center w-full block aspect-[3/1]">
                        <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                          {data.stripeImage !== "" ? (
                            <img
                              src={data?.stripeImage}
                              alt="top Image"
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
                          {state.user.firstName + " " + state.user.lastName ||
                            ""}
                        </p>
                      </div>
                    </div>
                    <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] ">
                      {qrCode ? (
                        <img src={qrCode} alt="QrCode" />
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
              <div className="max-w-[330px] relative">
                <div
                  className="visible w-[330px] shadow-lg text-white rounded-[32px]"
                  style={{
                    backgroundColor: data.backgroundColor,
                  }}
                >
                  <div className="flex flex-col h-full justify-between pb-6">
                    <div className="mt-3 ml-3 w-1/6">
                      <span className="block w-6  mt-3 ml-3 w-1/6">
                        {data.topLeftImage !== "" ? (
                          <img
                            src={data?.topLeftImage}
                            alt="top Image"
                            className="w-full h-auto m-auto"
                          />
                        ) : (
                          <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            viewBox="0 0 429.6 687.2"
                          >
                            <path
                              d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                              style={{
                                fill: "none",
                                stroke: "#FFFFFF",
                                strokeWidth: 54,
                              }}
                            ></path>
                            <path
                              fill=""
                              d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                              style={{
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                              }}
                            ></path>
                            <path
                              fill="#FFFFFF"
                              d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                              style={{
                                fillRule: "evenodd",
                                clipRule: "evenodd",
                              }}
                            ></path>
                            <path
                              fill="#FFFFFF"
                              d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
                            ></path>
                          </svg>
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
                    <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] ">
                      {qrCode ? (
                        <img src={qrCode} alt="QrCode" />
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
                          {data.stripeImage === "" ? (
                            "Doorway"
                          ) : (
                            <img
                              src={data?.stripeImage}
                              alt="top Image"
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
            <div className="flex mt-[12px] justify-center gap-[22px] text-[10px] font-[500]">
              <span
                className={`cursor-pointer ${
                  passType === enums.PASS_VIEW.APPLE
                    ? "text-black underline"
                    : "text-[#BEBEBE]"
                }`}
                onClick={() => {
                  setPassType(enums.PASS_VIEW.APPLE);
                  dispatch(
                    saveCurrentUser({ passType: enums.PASS_VIEW.APPLE })
                  );
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
                    saveCurrentUser({
                      passType: enums.PASS_VIEW.ANDROID,
                    })
                  );
                }}
              >
                {enums.PASS_VIEW.ANDROID}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassPreview;
