import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CircularProgressWithLabel } from "./CircularProgress";
import { DoorwayImages } from "./style";

interface navbarDataProps {
  name?: string;
  totalUsers?: number;
  availableUser?: number;
  id?: number;
}

const PrivateRoutesNavBar: React.FC<navbarDataProps> = ({
  name = "Samu Ullah",
  totalUsers = 100,
  availableUser = 2,
  id = 1,
}) => {
  const [showOption, setShowOption] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    if (showOption) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOption]);

  return (
    <div className="w-full border-b border-b-gray-100 px-8 min-md:px-[112px] flex h-[70px] items-center">
      <div>
        <Link href="/organization/home">
          <Image
            src={DoorwayImages?.logo || "/default-logo.png"}
            alt="Logo"
            className="w-auto h-[3rem]"
          />
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-end">
        <div className="flex gap-8 items-center">
          <div className="hidden min-md:flex items-center gap-8">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-gray-500 text-tiny font-regular hover:underline cursor-pointer">
                  <Link href="/organization/home">Doorways</Link>
                </span>
                <span className="font-semibold text-tiny text-gray-950">
                  Using {availableUser} of {totalUsers}
                </span>
              </div>
              <CircularProgressWithLabel value={availableUser || 0} />{" "}
              {/* Added fallback */}
            </div>
            <div className="h-8 border-r border-r-gray-100"></div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center text-gray-700 cursor-pointer">
              <div
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => setShowOption(!showOption)}
              >
                <div className="bg-brand-200 text-brand-500 rounded-full flex items-center justify-center w-[40px] h-[40px] text-petite font-medium">
                  SU
                </div>
                <div className="text-petite font-medium text-gray-700 whitespace-nowrap hidden min-md:flex items-center">
                  {name}
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="w-5"
                  >
                    <path d="M12 16L6 10H18L12 16Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            {showOption && (
              <div className="absolute z-50 top-[45px] left-1/2 transform -translate-x-1/2 px-2 py-3 bg-white border border-gray-50 rounded-regular opacity-100 scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100">
                <div className="w-fit min-md:w-[200px] flex flex-col gap-3 text-center">
                  <Link href="/organization/account">
                    <div className="inline-flex justify-center gap-6 px-[16px] py-[8px] text-petite font-semibold bg-brand-50 text-brand-500 rounded-[6px] hover:bg-brand-100 cursor-pointer">
                      My Account
                    </div>
                  </Link>
                  <div className="inline-flex items-center justify-center gap-6 px-[16px] py-[8px] text-petite font-medium text-gray-500 hover:text-brand-500 cursor-pointer">
                    Logout
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

export default PrivateRoutesNavBar;
