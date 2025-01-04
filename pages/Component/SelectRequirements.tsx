import { useRouter } from "next/router";
import React from "react";

interface SelectRequirementsProps {
  cancel?: boolean;
}

const SelectRequirements: React.FC<SelectRequirementsProps> = ({ cancel }) => {
  const routes = useRouter();
  const paymentRoute = (amount: number) => {
    console.log(amount);
  };
  return (
    <div className="flex flex-col items-center p-10">
      <div className="text-center max-w-[920px] mx-auto mb-[8px]">
        <div className="text-[25px] min-md:text-[50px]  font-bold">
          Select your requirements
        </div>
        <div className="text-[16px] min-md:text-[25px] font-normal mb-[38px] min-md:mb-[29px]">
          Get started instantly in Core or Business Tiers, or speak to the
          Doorway team about a custom enterprise plan. In any case,
          <span className="font-bold ">your first 30 days are free!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 min-md:grid-cols-3 gap-[30px] text-themeColor mb-[45px] text-[11px] min-md:text-[15px] justify-center">
        <div className="flex w-full flex-col min-md:flex-row items-center gap-[8px] cursor-pointer hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-[20px] w-[20px]"
          >
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"></path>
          </svg>{" "}
          Live Chat
        </div>

        <a
          href="mailto:raoikram431@gmail.com"
          className="flex w-full flex-col min-md:flex-row items-center gap-[8px] cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-[20px] w-[20px]"
          >
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"></path>
          </svg>
          sales@doorway.io
        </a>

        <a
          href="tel:+923091504735"
          className="flex w-full flex-col min-md:flex-row items-center gap-[8px] cursor-pointer hover:scale-105 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="1em"
            height="1em"
            fill="currentColor"
            className="h-[20px] w-[20px]"
          >
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"></path>
          </svg>
          +923091504735
        </a>
      </div>

      {cancel === true && (
        <div className="text-center  text-[#FF0000] p-[10px] text-base mb-[45px] ">
          Your subscription choice was cancelled. Please choose again.
        </div>
      )}

      <div className="flex flex-col min-md:flex-row gap-[20px] items-center min-md:items-stretch min-md:justify-center">
        <div
          className="group border  border-[#BEBEBE] border-opacity-40 hover:border-themeColor hover:cursor-pointer w-[269px] flex flex-col justify-start rounded-[10px] py-[24px] relative min-md:min-h-[546px] transition-all"
          onClick={() => paymentRoute(300)}
        >
          <div className="flex flex-col items-center">
            <div className="text-[#061C33] text-center font-inter text-[30px] font-bold leading-snug">
              Core
            </div>
            <div className="text-[#535353] text-black text-center font-inter text-[15px] font-bold leading-snug mt-[15px]">
              From $300 per month
            </div>
            <div className="w-[139px] py-[11px] bg-black group-hover:bg-themeColor rounded-[6px] cursor-pointer text-white text-center text-[15px] mt-[20px]">
              Select...
            </div>
          </div>
          <div className="w-[171px] mb-[22px] mt-[22px] border-t-[1px] border-[BEBEBE] m-auto border-dashed"></div>
          <div className="flex flex-col items-center text-[12px]">
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              100 Doorways
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              20 Trees Planted per Month
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              1 Admin to Control Doorway Details
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              1 Design Template
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Manage Doorways via CSV Upload
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              User Permissions
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Email Signatures
            </div>
          </div>
        </div>

        <div
          className="group border border-[#BEBEBE] border-opacity-40 hover:border-themeColor hover:cursor-pointer w-[269px] flex flex-col justify-start rounded-[10px] py-[24px] relative min-md:min-h-[546px] transition-all"
          onClick={() => paymentRoute(750)}
        >
          <div className="flex flex-col items-center">
            <div className="text-[#061C33] text-center font-inter text-[30px] font-bold leading-snug">
              Business
            </div>
            <div className="text-[#535353] text-black text-center font-inter text-[15px] font-bold leading-snug mt-[15px]">
              From $750 per month
            </div>
            <div className="w-[139px] py-[11px] bg-black group-hover:bg-themeColor rounded-[6px] cursor-pointer text-white text-center text-[15px] mt-[20px]">
              Select...
            </div>
          </div>
          <div className="w-[171px] mb-[22px] mt-[22px] border-t-[1px] border-[BEBEBE] m-auto border-dashed"></div>
          <div className="flex flex-col items-center text-[12px]">
            <div className="font-bold mb-[20px]">
              Everything included in Core, plus:
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              500 Doorways
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              50 Trees Planted per Month
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              5 Admins to Control Doorway Details
            </div>
          </div>
        </div>

        <div className="group border border-[2px] border-themeColor hover:border-black hover:cursor-pointer w-[269px] flex flex-col justify-start rounded-[10px] py-[24px] relative min-md:min-h-[546px] transition-all">
          <div className="group-hover:bg-black absolute top-[0] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-themeColor px-[18px] py-[5px] rounded-[12px] text-[10px] whitespace-nowrap text-white">
            Most popular
          </div>
          <div className="flex flex-col items-center">
            <div className="text-[#061C33] text-center font-inter text-[30px] font-bold leading-snug">
              Enterprise
            </div>
            <div className="text-[#535353] text-black text-center font-inter text-[15px] font-bold leading-snug mt-[15px]">
              Custom
            </div>
            <div className="w-[139px] py-[11px] bg-themeColor group-hover:bg-black rounded-[6px] cursor-pointer text-white text-center text-[15px] mt-[20px]">
              Contact sales
            </div>
          </div>
          <div className="w-[171px] mb-[22px] mt-[22px] border-t-[1px] border-[BEBEBE] m-auto border-dashed"></div>
          <div className="flex flex-col items-center text-[12px]">
            <div className="font-bold mb-[20px]">
              Everything included in Business, plus:
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Custom Number of Doorways
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Custom Trees Planted per Month
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Custom Admins to Control Doorway Details
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Custom Number of Design Templates
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Multiple Doorways per User
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              Administrative Units
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              SSO
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              HR Integration via SCIM2
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              White-Labelled Login & Interface
            </div>
            <div className="mt-[1px] text-[#535353] font-semibold text-center">
              24/7 Phone Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectRequirements;
