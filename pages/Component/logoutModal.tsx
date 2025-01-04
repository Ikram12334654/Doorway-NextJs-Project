import { setLoggedInFromAnyOtherLocation } from "@/redux/reducers/auth";
import { RootState } from "@/redux/store";
import { SuccessToastMessage } from "@/utils/toast";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.auth);

  if (!state.loggedInFromAnyOtherLocation) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-[20px] w-[320px] md:w-[400px] p-6 shadow-xl transform transition-all">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Session Alert
        </h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          You are logged in from another location. Please log out here if this
          was not you.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              SuccessToastMessage({
                message: "You have been logged out successfully.",
              });
              dispatch(
                setLoggedInFromAnyOtherLocation({
                  loggedInFromAnyOtherLocation: false,
                })
              );
            }}
            className="px-6 py-2 bg-themeColor text-white font-medium rounded-[20px] shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
