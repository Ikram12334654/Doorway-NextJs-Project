import Image, { StaticImageData } from "next/image";
import React from "react";
import { LoaderIcon } from "react-hot-toast";

interface formValues {
  logo: StaticImageData;
  label: string;
  onClick: VoidFunction;
}

const SocialLoginButton: React.FC<{
  values: formValues;
  loading?: boolean;
}> = ({ values, loading = false }) => {
  return (
    <div className="relative w-full mt-5">
      <button
        onClick={values?.onClick}
        disabled={loading}
        className={`w-full p-2 border flex items-center justify-start relative 
      ${
        loading
          ? "bg-gray-200 text-gray-500 border-gray-300 cursor-[not-allowed]"
          : "border-black hover:bg-[#F5F5F5FF]"
      }`}
      >
        <div className="flex items-center">
          <Image
            src={values?.logo}
            alt="social logo"
            className="h-[15px] w-auto mr-3 ml-10 sm:ml-1 sm:h-[11px] lg:ml-2"
          />
          <span>{values?.label}</span>
        </div>
      </button>
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <LoaderIcon className="animate-spin text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default SocialLoginButton;
