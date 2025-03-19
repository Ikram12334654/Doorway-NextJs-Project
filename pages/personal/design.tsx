import { authRoutes } from "@/assets/api";
import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import Button from "@/component/button";
import { saveDesign } from "@/redux/reducers/design";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import WestIcon from "@mui/icons-material/West";
import "cropperjs/dist/cropper.css";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserPass from "../../component/UserPass";

const EditDesignTemplate: React.FC = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    state.design.backgroundColor || ""
  );

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const authToken = state.auth.accessToken;

      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updateDesign,
        "put",
        {
          payload: {
            backgroundColor: backgroundColor,
          },
        },
        authToken
      );

      setLoading(false);

      if (response) {
        dispatch(saveDesign({ backgroundColor: backgroundColor }));
        SuccessToastMessage({ message: response?.message });
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const colors = [
    "#22242c",
    "#a5abff",
    "#f2f5f5",
    "#FF0000",
    "#1ed761",
    "#1b4446",
    "#2e2e2e",
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center w-full m-auto">
        <PrivateRoutesNavBar />
      </div>
      <div className="flex items-start gap-4 mb-6 w-[90%] m-auto mt-2 ">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center rounded-md text-black-500 hover:text-brand-500 cursor-pointer"
        >
          <WestIcon fontSize="small" />
          <span className="ml-1 ">Back</span>
        </button>
      </div>
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={`width:330px`}>
          <div className="block">
            <UserPass
              values={{
                backgroundColor: backgroundColor,
              }}
            />
          </div>
        </div>
        <div className="mx-auto min-md:ml-12 min-md:mr-0">
          <h1 className="font-heading text-2xl min-md:text-4xl font-semibold mb-8">
            Update your Doorway design
            <span className="text-electricGreen">.</span>
          </h1>
          <p>
            Choose your colour
            <span className="bg-red-600 text-white text-xs tracking-wide font-semibold px-2 py-1 rounded ml-3">
              FREE
            </span>
          </p>
          <div className="flex">
            {colors.map((e) => {
              return (
                <div
                  className={`border ${
                    backgroundColor?.toLocaleUpperCase() ===
                      e?.toLocaleUpperCase() && `ring-2 ring-blue-500`
                  } cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10`}
                  style={{ backgroundColor: e }}
                  onClick={() => setBackgroundColor(e)}
                />
              );
            })}
          </div>
          <div className="my-4">
            <Button
              height="6px"
              title="Update Card"
              loading={loading}
              onClick={handleSubmit}
              disabled={
                backgroundColor === "" ||
                backgroundColor.toLocaleUpperCase() ===
                  state.design.backgroundColor.toLocaleUpperCase()
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDesignTemplate;
