import { authRoutes } from "@/assets/api";
import { saveDesign } from "@/redux/reducers/design";
import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { base64ToBlob } from "@/utils/security";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import "cropperjs/dist/cropper.css";
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button";
import UserPass from "../UserPass";

const EditDesignOrganization: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#21242b");

  const [stripImageData, setStripImageData] = useState({
    file: null as File | null,
    preview: "",
    cropped: "",
  });

  const [logoImageData, setLogoImageData] = useState({
    file: null as File | null,
    preview: "",
    cropped: "",
  });

  const logoImageCropperRef = useRef<ReactCropperElement>(null);
  const stripeImageCropperRef = useRef<ReactCropperElement>(null);
  const maxSize = 1 * 1024 * 1024; // 1 MB

  const updateStripImage = (data: Partial<typeof stripImageData>) =>
    setStripImageData((prev) => ({ ...prev, ...data }));

  const updateLogoImage = (data: Partial<typeof logoImageData>) =>
    setLogoImageData((prev) => ({ ...prev, ...data }));

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File, url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        ErrorToastMessage({
          message: "File size exceeds the maximum limit of 1MB.",
        });
      } else {
        onChange(file, URL.createObjectURL(file));
      }
    }
  };

  const handleCropImage = (
    ref: React.RefObject<ReactCropperElement>,
    onChange: (url: string) => void
  ) => {
    const cropper = ref.current?.cropper;
    if (cropper) {
      const canvas = cropper.getCroppedCanvas();
      if (canvas) {
        onChange(canvas.toDataURL("image/png"));
      }
    }
  };

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      const authToken = state.auth.accessToken;

      const logoBlob = base64ToBlob(logoImageData.cropped, "image/png");
      const stripBlob = base64ToBlob(stripImageData.cropped, "image/png");

      formData.append("backgroundColor", backgroundColor);
      formData.append("logoImage", logoBlob, "logoImage.png");
      formData.append("stripImage", stripBlob, "stripImage.png");

      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.setupDesign,
        "post",
        {
          payload: formData,
        },
        authToken
      );
      setLoading(false);

      if (response) {
        dispatch(saveDesign(response.data));
        dispatch(
          saveUser({
            steps: state.user.steps + 1,
          })
        );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px] text-center max-w-[920px] mx-auto">
        Edit your design
      </div>
      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-[70%]">
        Voila! We’ve made a sample design. You can edit your Doorway design
        using the tools below, and you can come back and edit these designs any
        time.
      </div>
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className="width:330px">
          <UserPass
            values={{
              backgroundColor,
              stripImage: stripImageData.cropped,
              logoImage: logoImageData.cropped,
            }}
          />
        </div>
        <div className="w-[330px] flex flex-col gap-[42px]">
          <div className="grow flex flex-col gap-[7px]">
            <label className="text-[#304861] text-[15px] font-[500]">
              Color*
            </label>
            <div
              className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center"
              onClick={() => document.getElementById("color")?.click()}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <span
                    className="w-[18px] h-[18px] inline-block mr-[8px] rounded-sm"
                    style={{ background: backgroundColor }}
                  ></span>
                  {backgroundColor}
                </div>
              </div>
            </div>
            <input
              id="color"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              style={{
                position: "absolute",
                opacity: 0,
                pointerEvents: "none",
              }}
            />
          </div>
          <div className="grow flex flex-col gap-[7px]">
            <label className="text-[#304861] text-[15px] font-[500]">
              Strip Image
            </label>
            <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px]">
              <div className="flex items-center justify-between w-full py-3">
                {!stripImageData.file ? (
                  <label
                    htmlFor="stripeImage"
                    className="text-[#BEBEBE] cursor-pointer w-full"
                  >
                    .png or .jpeg files only
                  </label>
                ) : (
                  <>
                    <span className="truncate">{stripImageData.file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateStripImage({
                          file: null,
                          preview: "",
                          cropped: "",
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpg , image/jpeg , image/JPG"
                id="stripeImage"
                hidden
                disabled={!!stripImageData.file}
                onChange={(e) =>
                  handleFileChange(e, (file, url) =>
                    updateStripImage({ file, preview: url })
                  )
                }
              />
              {stripImageData.preview && (
                <div className="mb-4">
                  <Cropper
                    src={stripImageData.preview}
                    ref={stripeImageCropperRef}
                    style={{ width: "96%", height: "auto", margin: "auto" }}
                    aspectRatio={2}
                    guides={false}
                    scalable={true}
                    viewMode={1}
                    cropBoxResizable={true}
                    crop={() =>
                      handleCropImage(stripeImageCropperRef, (url) =>
                        updateStripImage({ cropped: url })
                      )
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="grow flex flex-col gap-[7px]">
            <label className="text-[#304861] text-[15px] font-[500]">
              Top Left Logo*
            </label>
            <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px]">
              <div className="flex items-center justify-between w-full py-3">
                {!logoImageData.file ? (
                  <label
                    htmlFor="topLeftLogoInput"
                    className="text-[#BEBEBE] cursor-pointer w-full"
                  >
                    .png or .jpeg files only
                  </label>
                ) : (
                  <>
                    <span className="truncate">{logoImageData.file.name}</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateLogoImage({
                          file: null,
                          preview: "",
                          cropped: "",
                        })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-black"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/png, image/jpg , image/jpeg , image/JPG"
                id="topLeftLogoInput"
                hidden
                disabled={!!logoImageData.file}
                onChange={(e) =>
                  handleFileChange(e, (file, url) =>
                    updateLogoImage({ file, preview: url })
                  )
                }
              />
              {logoImageData.preview && (
                <div className="mb-4">
                  <Cropper
                    src={logoImageData.preview}
                    ref={logoImageCropperRef}
                    style={{ width: "96%", height: "auto", margin: "auto" }}
                    aspectRatio={1}
                    guides={false}
                    scalable={true}
                    viewMode={1}
                    cropBoxResizable={true}
                    crop={() =>
                      handleCropImage(logoImageCropperRef, (url) =>
                        updateLogoImage({ cropped: url })
                      )
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <Button
            loading={loading}
            onClick={handleSubmit}
            disabled={
              !stripImageData.file || !logoImageData.file || !backgroundColor
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditDesignOrganization;
