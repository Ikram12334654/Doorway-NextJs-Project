import { RootState } from "@/redux/store";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authRoutes } from "@/assets/api";
import enums from "@/utils/enums";
import UserPass from "../UserPass";
import Button from "../button";

const SetupDoorwayOrganization: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [isValidURL, setIsValidURL] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: state.user.jobTitle || "",
    organizationName: state.user.organizationName || "",
    organizationURL: state.user.URLs[0]?.value || "",
  });

  const isFormValid =
    formData.jobTitle.trim() !== "" &&
    formData.organizationName.trim() !== "" &&
    formData.organizationURL.trim() !== "";

  const validateURL = (url: string) => {
    const urlPattern =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,6}(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;%=]*)?$/;

    return urlPattern.test(url);
  };

  const resetForm = () => {
    setFormData({
      jobTitle: "",
      organizationName: "",
      organizationURL: "",
    });
  };

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSetupDetails = async () => {
    const { jobTitle, organizationName, organizationURL } = formData;

    try {
      setLoading(true);

      const authToken = state.auth.accessToken;
      const role: string = enums.ROLES[2];

      const { response, error }: ApiResponse = await Api(
        "/" + role + authRoutes.setupAccount,
        "post",
        {
          payload: {
            jobTitle: jobTitle,
            organizationName: organizationName,
            organizationURL: organizationURL,
          },
        },
        authToken
      );

      setLoading(false);

      if (response) {
        // dispatch(
        //   saveUser({
        //     steps: state.user.steps + 1,
        //     jobTitle: jobTitle,
        //     organizationName: organizationName,
        //     URLs: [{ type: "work", value: organizationURL }],
        //   })
        // );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {
      setLoading(false);
    }

    resetForm();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isURLValid = validateURL(formData.organizationURL);
    setIsValidURL(isURLValid);

    if (isURLValid) {
      handleSetupDetails();
    }

    return;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Set up your Doorway
      </div>
      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full">
        Edit your job title to start personalising your Doorway, confirm your
        URL is correct, and click next to see a sample design.
      </div>
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={`width:330px`}>
          <div className="block">
            <UserPass values={formData} />
          </div>
        </div>
        <div className="w-[330px] flex flex-col gap-[42px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Job Title
              </label>
              <input
                name="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="Enter Job Title"
                className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px]"
              />
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Organization Name
              </label>
              <input
                name="organizationName"
                type="text"
                value={formData.organizationName}
                onChange={handleInputChange}
                placeholder="Enter Organization Name"
                className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px]"
              />
            </div>
            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Organization URL*
              </label>
              <input
                name="organizationURL"
                type="url"
                value={formData.organizationURL}
                onChange={handleInputChange}
                placeholder="Enter Organization URL"
                className={`bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px] ${
                  isValidURL ? "" : "border-red-500 border-[1px]"
                }`}
              />
              {!isValidURL && (
                <div className="text-[10px] text-red-500 text-right">
                  Invalid URL or domain name format.
                </div>
              )}
            </div>

            <Button loading={loading} disabled={!isFormValid} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetupDoorwayOrganization;
