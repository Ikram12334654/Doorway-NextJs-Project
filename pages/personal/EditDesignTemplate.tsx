import LoadingSpinner from "@/assets/LoadingSpinner";
import PrivateRoutesNavBar from "@/assets/privateRoutesNavBar";
import { saveCurrentDesign } from "@/redux/reducers/design";
import { saveCurrentUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { authRoutes } from "@/utils/routes";
import { decryptJSON } from "@/utils/security";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import WestIcon from "@mui/icons-material/West";
import "cropperjs/dist/cropper.css";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ReactCropperElement } from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import UserPass from "../Component/UserPass";

const EditDesignTemplate: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [stripImage, setStripImage] = React.useState<File | null>(null);
  const [stripImagePreview, setStripImagePreview] = useState<string>("");
  const [logoImage, setLogoImage] = React.useState<File | null>(null);
  const [logoImagePreview, setLogoImagePreview] = React.useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const state = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const logoImageCropperRef = useRef<ReactCropperElement>(null);
  const stripeImageCropperRef = useRef<ReactCropperElement>(null);
  const maxSize = 1 * 1024 * 1024; // 1MB in bytes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();

      const authToken = state.auth.token;

      formData.append("backgroundColor", backgroundColor || "");

      const { response, error } = await Api(
        "/" + enums.ROLES[state.user.role] + authRoutes.setupDesign,
        "post",
        {
          payload: formData,
        },
        authToken
      );

      setLoading(false);

      if (response) {
        const design = decryptJSON(response?.data);

        dispatch(
          saveCurrentDesign({
            backgroundColor: design?.backgroundColor,
          })
        );
        dispatch(
          saveCurrentUser({
            steps: state.user.steps + 1,
          })
        );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {
      setLoading(false);
    }

    resetForm();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 2000); // Simulate 4s loading delay

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center w-full m-auto">
        <PrivateRoutesNavBar />
      </div>
      <div className="flex items-start gap-4 mb-6 w-[90%] m-auto mt-2 ">
        <button
          onClick={() => router.push("/personal/home")}
          className="inline-flex items-center rounded-md text-black-500 hover:text-brand-500 cursor-pointer"
        >
          <WestIcon fontSize="small" />
          <span className="ml-1 ">Back</span>
        </button>
      </div>

      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        {loader === true && <LoadingSpinner size={100} color="success" />}
        {loader === false && (
          <div className={`width:330px`}>
            <div className="block">
              <UserPass
                values={{
                  backgroundColor: backgroundColor,
                }}
              />
            </div>
          </div>
        )}
        {loader == false && (
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

            {/* Color options */}
            <div className="flex">
              {/* Black color option */}
              <div
                className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{ backgroundColor: "rgb(34, 36, 44)" }}
                onClick={() => setBackgroundColor("rgb(34, 36, 44)")}
              />

              {/* Blue color option with image */}
              <div className="relative">
                <div
                  className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                  style={{
                    backgroundColor: "rgb(165, 171, 255)",
                    backgroundImage: 'url("rainbowLogo.png")',
                    backgroundSize: "cover",
                  }}
                  onClick={() => setBackgroundColor("rgb(165, 171, 255)")}
                />
              </div>

              {/* Light color option */}
              <div
                className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{ backgroundColor: "rgb(242, 245, 245)" }}
                onClick={() => setBackgroundColor("rgb(242, 245, 245)")}
              />

              {/* Green color option */}
              <div
                className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{ backgroundColor: "rgb(169, 215, 182)" }}
                onClick={() => setBackgroundColor("rgb(169, 215, 182)")}
              />

              {/* Bright green color option */}
              <div
                className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{ backgroundColor: "rgb(30, 215, 97)" }}
                onClick={() => setBackgroundColor("rgb(30, 215, 97)")}
              />

              {/* Dark color option */}
              <div
                className="border cursor-pointer mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{ backgroundColor: "rgb(27, 68, 70)" }}
                onClick={() => setBackgroundColor("rgb(27, 68, 70)")}
              />

              {/* Selected color option */}
              <div
                className="border cursor-pointer ring-2 ring-blue-500 mr-4 my-4 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                style={{
                  backgroundColor: backgroundColor || "rgb(46, 46, 46)",
                }}
                onClick={() => setBackgroundColor("rgb(46, 46, 46)")}
              />
            </div>

            {/* Update button */}
            <div className="my-4">
              <button
                className={`rounded-regular focus:outline-none focus:ring-transparent w-full text-white font-semibold text-legacy-regular py-[6px] rounded-md px-[10px] 
      ${backgroundColor ? "bg-themeColor" : "bg-gray-400 cursor-not-allowed"}`}
                type="button"
                disabled={!backgroundColor}
                onClick={() => handleSubmit}
              >
                Update Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditDesignTemplate;
