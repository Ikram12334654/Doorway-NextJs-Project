import Image from "next/image";
import React from "react";
import QRImage from "../../public/QrImage.png";
import DefaultLogo from "./defaultLogo";
import QRCode from "./QRCanvas";

const GooglePass: React.FC<{ values?: any }> = ({ values }) => {
  return (
    <div className="max-width: 22.5rem relative">
      <div
        className="visible w-[330px] shadow-lg text-white rounded-[32px]"
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

          <div className="mb-12">
            <div className="px-6">
              <p
                className="mt-[24px] text-lg leading-[40px] font-normal font-[700]"
                style={{ color: "rgb(255, 255, 255)" }}
              >
                {values?.firstName + " " + values?.lastName}
              </p>
              <p
                className="mt-[16px] text-mde font-normal"
                style={{ color: "rgb(255, 255, 255)" }}
              >
                {values?.jobTitle}
              </p>
            </div>
          </div>
          <div className="bg-white mx-auto rounded-md card-qrcode max-w-[138px] py-2 px-2 flex justify-center items-center">
            <QRCode />
          </div>
          <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
            <span className="flex items-center  w-full block aspect-[3/1]">
              <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                {!values?.stripImage ? (
                  "Doorway"
                ) : (
                  <img
                    src={values?.stripImage}
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
  );
};

export default GooglePass;
