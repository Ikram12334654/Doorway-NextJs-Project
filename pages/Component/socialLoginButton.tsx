import Image, { StaticImageData } from "next/image";
import React from "react";

interface formValues {
  logo: StaticImageData;
  label: string;
  onClick: VoidFunction;
}

const SocialLoginButton: React.FC<{ values: formValues }> = ({ values }) => {
  return (
    <button
      onClick={values?.onClick}
      className="w-full p-2  mt-5 border border-black hover:bg-[#F5F5F5FF] flex flex-row items-center "
    >
      <Image
        src={values?.logo}
        alt="google logo"
        className="h-[15px] w-auto mr-3 ml-10 sm:ml-1 sm:h-[11px] lg:ml-2 "
      />
      <span>{values?.label}</span>
    </button>
  );
};

export default SocialLoginButton;
