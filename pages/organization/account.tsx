import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import ChangePasswordModal from "@/pages/Component/Models/passwordModels";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WestIcon from "@mui/icons-material/West";
import Option from "@mui/joy/Option";
import Select from "@mui/joy/Select";
import { useRouter } from "next/router";
import React, { useState } from "react";
import TwoStepVarificationModel from "../Component/Models/TwoStepVarificationModel";

const MyAccount: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [isModalOpen1, setIsModalOpen1] = React.useState(false);
  const handleBackClick = () => {
    router.push("/organization/home");
  };
  const toggleModal1 = () => {
    setIsModalOpen1(!isModalOpen);
  };

  const closeModal1 = () => {
    setIsModalOpen1(false);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [selectedDevice, setSelectedDevice] = useState<string>("android");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const handleChange = (
    event:
      | React.MouseEvent<Element>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>,
    value: string | null
  ) => {
    if (value) {
      setSelectedDevice(value); // Update state with the selected value
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-center w-full m-auto">
        {<PrivateRoutesNavBar />}
      </div>
      <div className="px-8 min-md:px-[112px] mt-6 mb-16">
        <div>
          <div className="flex flex-col items-start gap-[16px]">
            <div
              className="inline-flex items-center rounded-[6px] text-petite font-medium justify-center gap-[6px] text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
              role="button"
              aria-disabled="false"
              onClick={handleBackClick}
            >
              <WestIcon fontSize="small" />
              <span className="whitespace-nowrap">Back</span>
            </div>
            <div className="flex flex-col min-md:flex-row justify-between items-start min-md:border-b-[1px] border-gray-200 w-full">
              <div className="text-lg font-semibold pb-[24px]">My Account</div>
            </div>
          </div>
          <div className="pt-[80px] flex flex-col gap-20">
            <div className="flex flex-col gap-6">
              <div className="flex pb-[24px] border-b border-gray-200">
                <div className="flex-grow flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    <span className="text-regular font-semibold text-gray-950">
                      Account Details
                    </span>
                  </div>
                  <div>
                    <span className="text-petite font-regular text-gray-500">
                      Manage personal information and settings
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[12px] py-[6px] focus:border-[2px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                    role="button"
                    onClick={toggleModal}
                  >
                    <span className="whitespace-nowrap">Change Password</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col min-md:flex-row gap-6">
                {/* Name Field */}
                <div className="w-full min-md:max-w-[389px]">
                  <div className="flex flex-col gap-[4px] flex-1 min-w-0 max-w-full">
                    <div className="flex items-center justify-between">
                      <div style={{ width: "100%" }}>
                        <div className="text-petite font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          Name
                        </div>
                      </div>
                      <div className="min-w-[50px]"></div>
                    </div>
                    <div className="flex items-center justify-stretch gap-[10px]">
                      <div className="flex-grow">
                        <div className="border-[1px] rounded-[6px] overflow-hidden border-gray-200 text-gray-400 bg-gray-100">
                          <div className="flex items-center">
                            <input
                              className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-200"
                              disabled
                              type="text"
                              value="Sami Ullah"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full min-md:max-w-[390px]">
                  <div className="flex flex-col gap-[4px] flex-1 min-w-0 max-w-full">
                    <div className="flex items-center justify-between">
                      <div style={{ width: "100%" }}>
                        <div className="text-petite font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          Account Email
                        </div>
                      </div>
                      <div className="min-w-[50px]"></div>
                    </div>
                    <div className="flex items-center justify-stretch gap-[10px]">
                      <div className="flex-grow">
                        <div className="border-[1px] rounded-[6px] overflow-hidden border-gray-200 text-gray-400 bg-gray-100">
                          <div className="flex items-center">
                            <input
                              className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-200"
                              disabled
                              type="text"
                              value="sami_ullah71@outlook.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ maxWidth: "390px" }}>
                <h4 style={{ marginBottom: "8px" }}>Language</h4>
                <Select
                  placeholder="Select a device type…"
                  value={selectedLanguage}
                  //onChange={(e:SelectChangeEvent<string>)=>setSelectedLanguage(e.target.value)}
                  indicator={<ArrowDropDownIcon />}
                  sx={{
                    color: "inherit",
                    background: "white", // Set white background color
                    opacity: 1,
                    width: "100%",
                    gridArea: "1 / 2",
                    font: "inherit",
                    minWidth: 2,
                    border: "1px solid #d1d5db", // Border color gray-100
                    borderRadius: "6px", // Rounded corners
                    outline: 0,
                    padding: "0.5rem", // Padding for better spacing
                    "& .MuiSelect-icon": {
                      color: "inherit",
                    },
                    "&:focus-within": {
                      borderColor: "#1ed761", // Green border color on focus
                      background: "white", // Keep background white on focus
                    },
                    "&:hover": {
                      backgroundColor: "white", // Change background on hover for the select box itself
                      color: "black", // Text color changes to black on hover for the select box
                    },
                  }}
                >
                  <Option
                    value="English"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ccffe6 !important", // Hover background color for Android option
                        color: "#1ed761 !important", // Text color for Android option on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent !important", // Remove background for selected Apple option
                        color: "black !important", // Text color for selected Apple option
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#ccffe6 !important", // Background color when selected and hovered
                        color: "#1ed761 !important", // Text color when selected and hovered
                      },
                    }}
                  >
                    English
                  </Option>
                  <Option
                    value="Espanio"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ccffe6 !important", // Hover background color for Android option
                        color: "#1ed761 !important", // Text color for Android option on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent !important", // Remove background for selected Apple option
                        color: "black !important", // Text color for selected Apple option
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#ccffe6 !important", // Background color when selected and hovered
                        color: "#1ed761 !important", // Text color when selected and hovered
                      },
                    }}
                  >
                    Espanio
                  </Option>
                  <Option
                    value="Italian"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ccffe6 !important", // Hover background color for Android option
                        color: "#1ed761 !important", // Text color for Android option on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent !important", // Remove background for selected Apple option
                        color: "black !important", // Text color for selected Apple option
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#ccffe6 !important", // Background color when selected and hovered
                        color: "#1ed761 !important", // Text color when selected and hovered
                      },
                    }}
                  >
                    Italian
                  </Option>
                </Select>
              </div>
              <div style={{ maxWidth: "390px" }}>
                <h4 style={{ marginBottom: "8px" }}>Device Type</h4>
                <Select
                  placeholder="Select a device type…"
                  value={selectedDevice}
                  // onChange={handleChange} // Uncomment this when you implement the handleChange
                  indicator={<ArrowDropDownIcon />}
                  sx={{
                    color: "inherit",
                    background: "white", // Default background for Select
                    opacity: 1,
                    width: "100%",
                    gridArea: "1 / 2",
                    font: "inherit",
                    minWidth: 2,
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    outline: 0,
                    padding: "0.5rem",
                    "& .MuiSelect-icon": {
                      color: "inherit",
                    },
                    "&:focus-within": {
                      borderColor: "#1ed761", // Green border color on focus
                      background: "white", // Keep background white on focus
                    },
                    "&:hover": {
                      backgroundColor: "white", // Change background on hover for the select box itself
                      color: "black", // Text color changes to black on hover for the select box
                    },
                  }}
                >
                  <Option
                    value="android"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ccffe6 !important", // Hover background color for Android option
                        color: "#1ed761 !important", // Text color for Android option on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent !important", // Remove background for selected Apple option
                        color: "black !important", // Text color for selected Apple option
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#ccffe6 !important", // Background color when selected and hovered
                        color: "#1ed761 !important", // Text color when selected and hovered
                      },
                    }}
                  >
                    Android
                  </Option>

                  <Option
                    value="apple"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#ccffe6 !important", // Hover background color for Apple option
                        color: "#1ed761 !important", // Text color for Apple option on hover
                      },
                      "&.Mui-selected": {
                        backgroundColor: "transparent !important", // Remove background for selected Apple option
                        color: "black !important", // Text color for selected Apple option
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#ccffe6 !important", // Background color when selected and hovered
                        color: "#1ed761 !important", // Text color when selected and hovered
                      },
                    }}
                  >
                    Apple
                  </Option>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              {/* 2FA Header Section */}
              <div className="flex pb-[24px] border-b border-gray-200">
                <div className="flex-grow flex flex-col gap-[12px]">
                  <div className="flex gap-[12px]">
                    <span className="text-regular font-semibold text-gray-950">
                      Two-Factor Authentication (2FA)
                    </span>
                  </div>
                  <div>
                    <span className="text-petite font-regular text-gray-500">
                      Keep your account secure by requiring a verification code
                      for each login
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* Setup 2FA Button */}
                  <div
                    className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[12px] py-[6px] focus:border-[2px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                    role="button"
                    onClick={toggleModal1}
                  >
                    <span className="whitespace-nowrap">Setup 2FA</span>
                  </div>
                </div>
              </div>

              {/* 2FA Disabled Section */}
              <div className="bg-gray-50 w-full px-6 py-12 rounded-[12px] flex flex-col items-center gap-6">
                <div className="text-small font-semibold text-gray-950">
                  2FA is not enabled for your account
                </div>
                {/* Setup 2FA Button (For Disabled state) */}
                <div
                  className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[15px] py-[7px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                  role="button"
                  onClick={toggleModal1}
                >
                  <span className="whitespace-nowrap">Setup 2FA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <ChangePasswordModal onClose={closeModal} />}
      {isModalOpen1 && <TwoStepVarificationModel onClose={closeModal1} />}
    </div>
  );
};

export default MyAccount;
