import React from "react";
import { LoaderIcon } from "react-hot-toast";

interface ButtonProps {
  title?: string;
  disabled?: boolean;
  height?: string;
  loading?: boolean;
  onClick?: () => void;

  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title = "Next",
  disabled = false,
  loading = false,
  height = "12px",
  onClick,
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center justify-center w-full text-white text-[15px] font-[500] rounded-[5px] py-[${height}] text-center ${
        isDisabled
          ? "bg-gray-400 cursor-default"
          : "bg-themeColor cursor-pointer"
      }`}
    >
      {loading ? (
        <LoaderIcon className="animate-spin text-gray-600 mr-[8px]" />
      ) : null}
      {title}
    </button>
  );
};

export default Button;
