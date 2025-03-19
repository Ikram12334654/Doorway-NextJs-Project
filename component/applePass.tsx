import React from "react";
import DefaultLogo from "./defaultLogo";
import QRCode from "./QRCanvas";

const ApplePass: React.FC<{ values?: any }> = ({ values }) => {
  return (
    <div className="max-width: 22.5rem relative">
      <div
        className="visible w-[330px] shadow-lg text-white rounded-2xl"
        style={{
          backgroundColor: values?.backgroundColor,
        }}
      >
        <div className="flex flex-col h-full justify-between pb-6">
          <div className="mt-3 ml-3 w-2/6 ">
            <span className="block w-6  mt-3 ml-3 w-2/6">
              {values?.logoImage ? (
                <img
                  src={values?.logoImage}
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
                {values?.stripImage ? (
                  <img
                    src={values?.stripImage}
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
                {values?.jobTitle}
              </p>
              <p
                className="text-mde font-extralight"
                style={{ color: "rgb(255, 255, 255)" }}
              >
                {values?.firstName + " " + values?.lastName || ""}
              </p>
            </div>
          </div>
          <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] py-2 px-2 flex justify-center items-center">
            <QRCode />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplePass;
