import { saveCurrentDesign } from "@/redux/reducers/design";
import { saveCurrentUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { authRoutes } from "@/utils/routes";
import { decryptJSON } from "@/utils/security";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "./button";
import PassPreview from "./passPreview";
import  Cropper  from "react-cropper";
import "cropperjs/dist/cropper.css";



const EditYourDesign: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stripImage, setStripImage] = React.useState<File | null>(null);
  const [stripImagePreview, setStripImagePreview] = useState<string>("");
  const [logoImage, setLogoImage] = React.useState<File | null>(null);
  const [logoImagePreview, setLogoImagePreview] = React.useState<string>("");
  const [backgroundColor, setBackgroundColor] = useState("#21242b");
  const [logoImageCropped,setLogoImageCropped]=useState<string|null>(null)
  const [stripeImageCropped,setStripeImageCropped]=useState<string|null>(null)
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const logoImageCropperRef = useRef<Cropper>(null);
  const stripeImageCropperRef = useRef<Cropper>(null); 
  const maxSize = 1 * 1024 * 1024; // 1MB in bytes

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        ErrorToastMessage({
          message: "File size exceeds the maximum limit of 1MB.",
        });
      } else {
        setStripImage(file);
        setStripImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleFileChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize) {
        ErrorToastMessage({
          message: "File size exceeds the maximum limit of 1MB.",
        });
      } else {
        setLogoImage(file);
        setLogoImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const resetForm = () => {
    setBackgroundColor("#21242b");
    setLogoImage(null);
    setLogoImagePreview("");
    setStripImage(null);
    setStripImagePreview("");
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const formData = new FormData();

      const authToken = state.auth.token;

      formData.append("backgroundColor", backgroundColor || "");
      formData.append("logoImage", logoImage || "");
      formData.append("stripImage", stripImage || "");

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
            default: design?.default,
            logoImage: design?.logoImage,
            stripImage: design?.stripImage,
            name: design?.name,
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

  const handleCropLogoImage = () => {
    if (logoImageCropperRef.current) {
      const cropperInstance = logoImageCropperRef.current.cropper; // Access cropper instance
      const croppedCanvas = cropperInstance.getCroppedCanvas(); // Call getCroppedCanvas on the cropper instance
      if (croppedCanvas) {
        setLogoImageCropped(croppedCanvas.toDataURL("image/png")); // Set the cropped image data
      }
    }
  };

  const handleCropStripeImage = () => {
    if (stripeImageCropperRef.current) {
      const cropperInstance = stripeImageCropperRef.current.cropper; // Access cropper instance
      const croppedCanvas = cropperInstance.getCroppedCanvas(); // Call getCroppedCanvas on the cropper instance
      if (croppedCanvas) {
        setStripeImageCropped(croppedCanvas.toDataURL("image/png")); // Set the cropped image data
      }
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Edit your design
      </div>
      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-[70%]">
        Voila! We’ve made a sample design. You can edit your Doorway design
        using the tools below, and you can come back and edit these designs any
        time.
      </div>
      <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
        <div className={`width:330px`}>
          <div className="block">
            <PassPreview
              values={{
                backgroundColor: backgroundColor,
                stripImage: stripImagePreview,
                logoImage: logoImagePreview,
              }}
            />
          </div>
        </div>
        <div className="w-[330px] flex flex-col gap-[42px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Color*
              </label>
              <div
                className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center"
                onClick={() => document.getElementById("color")!.click()}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span
                      className="w-[18px] h-[18px] inline-block mr-[8px] rounded-sm"
                      style={{ background: backgroundColor }}
                    ></span>
                    {backgroundColor}
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
                value={backgroundColor}
                onChange={handleColorChange}
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
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center">
                <label
                  htmlFor="stripeImage"
                  className={`cursor-pointer flex items-center w-full ${
                    stripImagePreview ? "text-[black]" : "text-[#BEBEBE]"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/png, image/jpg , image/jpeg , image/JPG"
                    id="stripeImage"
                    hidden
                    onChange={handleFileChange}
                  />
                  {stripImagePreview ? (
                    <div className="flex flex-row justify-between w-full ">
                      <div>{stripImage?.name}</div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="1em"
                        onClick={() => {
                          setStripImage(null);
                          setStripImagePreview("");
                        }}
                        height="1em"
                        fill="currentColor"
                        className="right-[10px] top-[50%] mt-2 transform  w-[14px] h-[14px] text-[black]"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                      </svg>
                    </div>
                  ) : (
                    ".png or .jpeg files only"
                  )}
                </label>
              {stripImagePreview  && (
                        <div className="mb-4">
                          <Cropper
                            src={stripImagePreview}
                            ref={stripeImageCropperRef} // Use the correctly typed ref
                            className="cropper"
                            style={{
                              width: "96%",
                              height: "auto",
                              margin: "auto",
                            }} // Dynamically set cropper size
                            aspectRatio={1} // Maintain a square crop
                            guides={false}
                            scalable={true}
                            viewMode={1}
                            cropBoxResizable={true}
                            crop={handleCropStripeImage} // Trigger handleCrop on crop update
                          />
                        </div>
                      )}
              </div>
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Top Left Logo*
              </label>
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center">
                <label
                  htmlFor="topLeftLogoInput"
                  className={`cursor-pointer flex items-center w-full ${
                    logoImagePreview ? "text-[black]" : "text-[#BEBEBE]"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/png, image/jpg , image/jpeg , image/JPG"
                    id="topLeftLogoInput"
                    hidden
                    onChange={handleFileChangeLogo}
                  />
                  {logoImagePreview ? (
                    <div className="flex flex-row justify-between w-full ">
                      <div>{logoImage?.name}</div>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="1em"
                        onClick={() => {
                          setLogoImage(null);
                          setLogoImagePreview("");
                        }}
                        height="1em"
                        fill="currentColor"
                        className="right-[10px] top-[50%] mt-2 transform  w-[14px] h-[14px] text-[black]"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                      </svg>
                    </div>
                  ) : (
                    ".png or .jpeg files only"
                  )}
                </label>
                {logoImagePreview  && (
                        <div className="mb-4">
                          <Cropper
                            src={logoImagePreview}
                            ref={logoImageCropperRef} // Use the correctly typed ref
                            className="cropper"
                            style={{
                              width: "96%",
                              height: "auto",
                              margin: "auto",
                            }} // Dynamically set cropper size
                            aspectRatio={1} // Maintain a square crop
                            guides={false}
                            scalable={true}
                            viewMode={1}
                            cropBoxResizable={true}
                            crop={handleCropLogoImage} // Trigger handleCrop on crop update
                          />
                        </div>
                      )}
              </div>
            </div>

            <Button
              loading={loading}
              disabled={!stripImage || !logoImage || !backgroundColor}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditYourDesign;
