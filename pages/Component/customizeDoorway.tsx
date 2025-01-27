import { saveCurrentUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import PassPreview from "./passPreview";

const CustomizeYourDesign: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    color: state.design.backgroundColor || "#22242C",
    firstName: state.user.firstName || "",
    lastName: state.user.lastName || "",
    organization: state.user.organizationName || "",
    jobTitle: state.user.jobTitle || "",
    email: state.user.emails || [
      {
        type: "",
        value: "",
      },
    ],
    phoneNumber: [
      {
        type: "",
        value: "",
      },
    ],
    urls: [
      {
        type: "",
        value: "",
      },
    ],
    aboutus: "",
  });
  const Remove = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      className="w-[20px] h-[20px]"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
    </svg>
  );
  const [formErrors, setFormErrors] = useState({
    deviceType: false,
    color: false,
    firstName: false,
    lastName: false,
    organization: false,
    jobTitle: false,
    email: false,
    phoneNumber: false,
    urls: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddField = (field: keyof typeof formData) => {
    if (Array.isArray(formData[field])) {
      setFormData((prevState) => ({
        ...prevState,
        [field]: [...prevState[field], ""],
      }));
    }
  };

  const handleRemoveField = (field: keyof typeof formData, index: number) => {
    if (Array.isArray(formData[field])) {
      const updatedValues = formData[field].filter((_, i) => i !== index);
      setFormData((prevState) => ({
        ...prevState,
        [field]: updatedValues,
      }));
    }
  };

  const handleChangeArray = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof typeof formData
  ) => {
    const { value } = e.target;

    const updatedValues = [...formData[field]].map((item, i) =>
      i === index ? { type: "work", value } : item
    );

    setFormData((prevState) => ({
      ...prevState,
      [field]: updatedValues,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((errors, key) => {
      const value = formData[key as keyof typeof formData];

      errors[key as keyof typeof formErrors] =
        typeof value === "string" ? value.trim() === "" : false;

      return errors;
    }, {} as typeof formErrors);

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (!hasErrors) {
      handleCreate(formData);
      // handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      color: "#22242C",
      firstName: "",
      lastName: "",
      organization: "",
      jobTitle: "",
      email: [
        {
          type: "",
          value: "",
        },
      ],
      phoneNumber: [
        {
          type: "",
          value: "",
        },
      ],
      urls: [
        {
          type: "",
          value: "",
        },
      ],
      aboutus: "",
    });
  };

  const handleCreate = (form: any) => {
    console.log(JSON.stringify(form, null, 2));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Customize your doorway
      </div>

      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-[70%]">
        Add the information you want your Doorway to share.
      </div>
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={`width:330px`}>
          <div className="block">
            <PassPreview
              values={{
                backgroundColor: formData.color,
                firstName: formData.firstName,
                lastName: formData.lastName,
                jobTitle: formData.jobTitle,
              }}
            />
          </div>
        </div>
        <div className="w-[330px] flex flex-col gap-[30px]">
          <form
            onSubmit={handleSubmit}
            className="w-[330px] flex flex-col gap-[20px]"
          >
            <div className="flex flex-col gap-[25px]">
              <div className="text-navyBlue leading-regular flex cursor-default items-center gap-[5px] text-[15px] md:text-[13px]">
                <div className="flex items-center gap-[5px] font-[500]">
                  <div className="flex items-center">
                    Device Type<span>*</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-between">
                <label
                  className={`border py-[15px] text-legacy-regular rounded-regular flex-1 flex justify-center cursor-pointer ${
                    state.user.passType === enums.PASS_VIEW.APPLE
                      ? "border-themeColor text-themeColor"
                      : "border-gray-200 text-gray-400"
                  }`}
                  htmlFor="apple"
                >
                  Apple
                  <input
                    className="hidden"
                    id="apple"
                    name="deviceType"
                    type="radio"
                    value="apple"
                    checked={state.user.passType === enums.PASS_VIEW.APPLE}
                    onChange={handleChange}
                    onClick={() => {
                      dispatch(
                        saveCurrentUser({
                          passType: enums.PASS_VIEW.APPLE,
                        })
                      );
                    }}
                  />
                </label>
                <label
                  className={`border py-[15px] text-legacy-regular rounded-regular flex-1 flex justify-center cursor-pointer ${
                    state.user.passType === enums.PASS_VIEW.ANDROID
                      ? "border-themeColor text-themeColor"
                      : "border-gray-200 text-gray-400"
                  }`}
                  htmlFor="android"
                >
                  Android
                  <input
                    className="hidden"
                    id="android"
                    name="deviceType"
                    type="radio"
                    value="android"
                    checked={state.user.passType === enums.PASS_VIEW.ANDROID}
                    onClick={() => {
                      dispatch(
                        saveCurrentUser({
                          passType: enums.PASS_VIEW.ANDROID,
                        })
                      );
                    }}
                    onChange={handleChange}
                  />
                </label>
              </div>
              {formErrors.deviceType && (
                <p className="text-red-500">Device type is required.</p>
              )}
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Color*
              </label>
              <div
                className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] flex items-center"
                onClick={() => document.getElementById("color")!.click()}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span
                      className="w-[18px] h-[18px] inline-block mr-[8px] rounded-sm"
                      style={{ background: formData.color }}
                    ></span>
                    {formData.color}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    className="w-[14px] h-[14px] text-[#BEBEBE]"
                  >
                    <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"></path>
                  </svg>
                </div>
              </div>
              <input
                id="color"
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              {formErrors.color && (
                <p className="text-red-500">Color is required.</p>
              )}
            </div>

            <div className="flex flex-row w-full justify-between space-x-7">
              <div className="grow flex flex-col gap-[7px] w-[40%] ">
                <div className="text-[#304861] text-[15px]  md:text-[13px] font-[500]">
                  First Name*
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                />
                {formErrors.firstName && (
                  <p className="text-red-500">First name is required.</p>
                )}
              </div>

              <div className="grow flex flex-col gap-[7px] w-[45%]">
                <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                  Last Name*
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                />
                {formErrors.lastName && (
                  <p className="text-red-500">Last name is required.</p>
                )}
              </div>
            </div>
            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                Organization*
              </div>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Pierce & Pierce"
                className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
              />
              {formErrors.organization && (
                <p className="text-red-500">Organisation is required.</p>
              )}
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                Job Title*
              </div>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Vice President"
                className="bg-[#F2F5F5] focus   rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
              />
              {formErrors.jobTitle && (
                <p className="text-red-500">Job title is required.</p>
              )}
            </div>
            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                Phone Numbers
              </div>
              {formData.phoneNumber.map((phone, index) => (
                <div className="relative flex gap-[10px]" key={index}>
                  <input
                    type="tel"
                    name={`phone-${index}`}
                    value={phone.value}
                    onChange={(e) => handleChangeArray(e, index, "phoneNumber")}
                    className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                    placeholder="Phone Number"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField("phoneNumber", index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <Remove />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("phoneNumber")}
                className="text-black font-semibold mt-2 text-left"
              >
                + Add Phone Number
              </button>
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                Email
              </div>
              {formData.email.map((email, index) => (
                <div className="relative flex flex-row gap-[10px] ">
                  <div className="flex gap-[10px] w-full" key={index}>
                    <input
                      type="email"
                      name={`email-${index}`}
                      value={email.value}
                      onChange={(e) => handleChangeArray(e, index, "email")}
                      className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                      placeholder="Email"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField("email", index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <Remove />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("email")}
                className="text-black font-semibold mt-2 text-left"
              >
                + Add Email
              </button>
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                URLs
              </div>
              {formData.urls.map((url, index) => (
                <div className="relative flex gap-[10px]" key={index}>
                  <input
                    type="url"
                    name={`url-${index}`}
                    value={url.value}
                    onChange={(e) => handleChangeArray(e, index, "urls")}
                    className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                    placeholder="URL"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField("urls", index)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      <Remove />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField("urls")}
                className="text-black font-semibold mt-2 text-left"
              >
                + Add URL
              </button>
            </div>
            <div className="grow flex flex-col gap-[7px]">
              <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                how did you here about us?
              </div>
              <input
                type="text"
                name="aboutus"
                value={formData.aboutus}
                onChange={handleChange}
                placeholder="how did you here about us "
                className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500">Phone number is required.</p>
              )}
            </div>
            <Button />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomizeYourDesign;
