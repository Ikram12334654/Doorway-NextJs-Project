import AuthNavbar from "@/assets/authNavbar";
import SignUpOrganization from "@/component/organization/signUp";
import SignUpPersonal from "@/component/personal/signUp";
import { saveAccount } from "@/redux/reducers/account";
import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [type, setType] = useState(state.account.type || "");

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-[80%] z-10 mt-3 ml-[10%] md:w-[90%] md:ml-[5%]">
        <AuthNavbar />
      </div>
      {!state.account.type && (
        <div>
          <div className="w-[60%] z-10 text-center flex flex-col items-center justify-center mx-auto md:w-[80%] mt-[5%]">
            <span className="min-lg:text-xl min-sm:text-md min-md:text-lg font-semibold">
              Create an account for your business or a free Doorway for yourself
            </span>
          </div>
          <div className="flex flex-col mt-5 items-center justify-center gap-[58px]">
            <div className="flex flex-col min-md:flex-row gap-[40px]">
              <div
                onClick={() => {
                  setType(enums.ACCOUNT_TYPE.ORGANIZATION);
                }}
                className={`relative w-[250px] h-[250px] rounded-[8px] shadow-lg flex flex-col items-center justify-center gap-[10px] p-[15px] cursor-pointer border ${
                  type === enums.ACCOUNT_TYPE.ORGANIZATION
                    ? "border-themeColor text-themeColor border-2"
                    : "border-black border-opacity-10"
                }`}
              >
                <div className="absolute top-[5px] left-[-50px] px-[10px] h-[26px] bg-themeColor rounded-[3px] text-white text-[10px] flex items-center justify-center">
                  First 30 days free
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1rem"
                  height="1rem"
                  fill="currentColor"
                  className="w-[60px] h-[60px] mb-[20px] "
                >
                  <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z"></path>
                  <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z"></path>
                </svg>
                <div className="text-center font-inter text-black text-[18px] font-semibold leading-normal">
                  Organization
                </div>
                <div className="text-center font-inter text-black dark:text-black text-[12px] opacity-60 font-medium leading-[18px]">
                  Design your Doorway and start using our platform instantly
                </div>
              </div>
              <div
                onClick={() => {
                  setType(enums.ACCOUNT_TYPE.PERSONAL);
                }}
                className={`relative w-[250px] h-[250px] rounded-[8px] shadow-lg flex flex-col items-center justify-center gap-[10px] p-[15px] cursor-pointer border ${
                  type === enums.ACCOUNT_TYPE.PERSONAL
                    ? "border-themeColor text-themeColor border-2"
                    : "border-black border-opacity-10"
                }`}
              >
                <div className="absolute top-[5px] font-[600] right-[-35px] px-[10px] h-[26px] bg-[#FEEDD8] rounded-[3px] text-black text-[10px] flex items-center justify-center">
                  Always free
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="1rem"
                  height="1rem"
                  fill="currentColor"
                  className="w-[60px] h-[60px] mb-[20px] "
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path>
                </svg>
                <div className="text-center font-inter text-black text-[18px] font-semibold leading-normal">
                  Personal
                </div>
                <div className="text-center font-inter text-black dark:text-black text-[12px] opacity-60 font-medium leading-[18px]">
                  Create a free Doorway to share your information from your
                  digital wallet
                </div>
              </div>
            </div>
            <div className="w-[285px]">
              <div
                className={` disabled:bg-gray-400 text-white cursor-pointer text-[15px] font-[500] heading-[14px] rounded-[5px] text-center ${
                  state.account.type === ""
                    ? "bg-gray-400 cursor-default"
                    : "bg-themeColor"
                }`}
              >
                <button
                  onClick={() => {
                    dispatch(
                      saveUser({
                        steps: 1,
                      })
                    );
                    dispatch(saveAccount({ type }));
                  }}
                  disabled={type ? false : true}
                  className={`bg-themeColor w-[285px] disabled:bg-gray-400 text-white cursor-pointer text-[15px] font-[500] heading-[14px] rounded-[5px] py-[12px] min-md:py-[14px] text-center ${
                    state.account.type === ""
                      ? "bg-gray-400 cursor-default"
                      : "bg-themeColor"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {state.account.type &&
        state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
          <SignUpOrganization />
        )}
      {state.account.type === enums.ACCOUNT_TYPE.PERSONAL && <SignUpPersonal />}
    </div>
  );
}

export default SignUp;
