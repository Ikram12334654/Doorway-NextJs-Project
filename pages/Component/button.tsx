import React from "react";
import { LoaderIcon } from "react-hot-toast";

interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  loading = false,
  onClick,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center justify-center w-full text-white text-[15px] font-[500] rounded-[5px] py-[12px] text-center ${
        isDisabled
          ? "bg-gray-400 cursor-default"
          : "bg-themeColor cursor-pointer"
      }`}
    >
      {loading ? (
        <LoaderIcon className="animate-spin text-gray-600 mr-[8px]" />
      ) : null}
      Next
    </button>
  );
};

export default Button;
