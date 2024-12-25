import React, { useState } from "react";
import PassPreview from "./passPreview";
const EditYourDesign: React.FC = () => {
  const [stripImage, setStripImage] = React.useState<string | null>(null);
  const [topLeftLogo, setTopLeftLogo] = React.useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#21242b");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStripImage(file.name);
    }
  };

  const handleFileChangeLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTopLeftLogo(file.name);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
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
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span
                      className="w-[18px] h-[18px] inline-block mr-[8px] rounded-sm"
                      style={{ background: backgroundColor }}
                    ></span>
                    {backgroundColor}
                  </div>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={handleColorChange}
                    className="w-full h-full cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Strip Image
              </label>
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="stripImageInput"
                  hidden
                  onChange={(e) => handleFileChange}
                />
                <label
                  htmlFor="stripImageInput"
                  className="cursor-pointer flex items-center w-full text-[#BEBEBE]"
                >
                  {stripImage ? stripImage : ".png or .jpeg files only"}
                </label>
              </div>
            </div>

            <div className="grow flex flex-col gap-[7px]">
              <label className="text-[#304861] text-[15px] font-[500]">
                Top Left Logo*
              </label>
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] flex items-center">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="topLeftLogoInput"
                  hidden
                  onChange={(e) => handleFileChangeLogo}
                />
                <label
                  htmlFor="topLeftLogoInput"
                  className="cursor-pointer flex items-center w-full text-[#BEBEBE]"
                >
                  {topLeftLogo ? topLeftLogo : ".png or .jpeg files only"}
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#BEBEBE] text-white text-[15px] font-[500] rounded-[5px] py-[12px]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditYourDesign;
