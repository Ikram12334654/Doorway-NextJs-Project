import React, { useEffect, useState } from 'react'
import QRImage from '../../public/QrImage.png' 
import Image from 'next/image';

import { generateQrCodeData } from './QRCodeGeneratorProps';
const SetUpDoorway:React.FC<{ onNextStep: () => void }> = ({ onNextStep }) =>  {
    const svgIcon =
        `<svg
            version="1.1"
            id="Layer_1"
            height='128',
            width='128'
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            viewBox="0 0 429.6 687.2"
          >
            <path
                d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                style={{
                    fill: 'none',
                    stroke: '#FFFFFF',
                    strokeWidth: 54,
                }}
            ></path>
            <path
                fill=""
                d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            ></path>
            <path
                fill="#FFFFFF"
                d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
            ></path>
            <path
                fill="#FFFFFF"
                d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
            ></path>
          </svg>`;


    const [ImageLogo,setImageLogo]=useState(svgIcon);
    const [backgroundColor,setBackgroundColor]=useState('rgb(34, 36, 44)')
    const [textColor,setTextColor]= useState(' rgb(255, 255, 255);');
    const [cardDevice,setCardDevice]=useState("Apple")
    const [designation,setDesignation]=useState("Designation");
    const [name,setName]=useState("Ikram Ullah")
    const [isValidURL, setIsValidURL] = useState(true);
    const isSvg = ImageLogo.trim().startsWith('<svg');
    const [formData, setFormData] = useState({
        jobTitle: "",
        organizationName: "",
        organizationURL: "",
      });
    const isFormValid =
    formData.jobTitle.trim() !== "" &&
    formData.organizationName.trim() !== "" &&
    formData.organizationURL.trim() !== "";

      const [qrCode, setQrCode] = useState<string>("");

      const validateURL = (url:string) => {
        const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,6}(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;%=]*)?$/;

        return urlPattern.test(url);
      };
      const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update the form data state
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        // Generate QR code every time a field is updated
        const qrCode = await generateQrCodeData({ ...formData, [name]: value });
        if (qrCode) {
          setQrCode(qrCode);
        }
        if(name==='jobTitle'){
          setDesignation(value)
        }

      };

    // Submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isURLValid= validateURL(formData.organizationURL)
        setIsValidURL(isURLValid);
        if(isURLValid){
          generateQrCodeData(formData);
          if (onNextStep) {
              onNextStep(); // Call the parent's callback to update the step
            }
        }
       return "";
    };
  
    const handleBlur = async () => {
        const qrCodeData = await generateQrCodeData(formData);
        if (qrCodeData) {
          setQrCode(qrCodeData);
        }
      };
    return (
        <div className="flex flex-col items-center">
            <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
                Set up your Doorway
            </div>
            <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full">
                Edit your job title to start personalising your Doorway, confirm your URL is correct, and click next to see a sample design.
            </div>
            <div className='flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5'>
                <div className={`width:330px`}>
                    <div className='block'>
                       {cardDevice==='Apple' && <div className='max-w-[330px] relative'>
                            <div className='visible w-[330px] shadow-lg text-white rounded-2xl' style={{ backgroundColor: backgroundColor }}>
                                <div className='flex flex-col h-full justify-between pb-6'>
                                    <div className="mt-3 ml-3 w-1/6">
                                        {/* Image element dynamically sourced from state */}
                                        <span className="block w-4 sm:w-5 mt-3 ml-3 w-1/6">
                                        {isSvg ? (
                                            // Render SVG directly
                                            <svg
                                                version="1.1"
                                                id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0"
                                                y="0"
                                                viewBox="0 0 429.6 687.2"
                                            >
                                                <path
                                                    d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: '#FFFFFF',
                                                        strokeWidth: 54,
                                                    }}
                                                ></path>
                                                <path
                                                    fill=""
                                                    d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                                                    style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                                                ></path>
                                                <path
                                                    fill="#FFFFFF"
                                                    d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                                                    style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                                                ></path>
                                                <path
                                                    fill="#FFFFFF"
                                                    d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            // Render image if logoImage is a URL
                                            <img src={ImageLogo} alt="Dynamic" className="w-full h-auto" />
                                        )}                                       
                                      </span>
                                    </div>
                                    <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
                                        <span className="flex items-center px-6 w-full block aspect-[3/1]">
                                        <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                                         Doorway
                                        </div>
                                        </span>
                                    </div>
                                    <div className="mb-12">
                                        <div className="px-6">
                                            <p className="text-mde uppercase" style={{color:textColor }}>{designation}</p>
                                            <p className="text-mde font-extralight" style={{color:textColor }}>{name}</p>
                                        </div>
                                    </div>
                                    <div className='bg-white mx-auto rounded-md card-qrcode max-w-[138px] '>
                                       {qrCode ? 
                                       <img src={qrCode} alt='QrCode'/> : <Image src={QRImage} alt="Description" width={128} height={128} />}
                                       
                                      
                               
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {cardDevice==="Android" && <div className='max-w-[330px] relative'>
                            <div className='visible w-[330px] shadow-lg text-white rounded-[32px]' style={{ backgroundColor: backgroundColor }}>
                                <div className='flex flex-col h-full justify-between pb-6'>
                                    <div className="mt-3 ml-3 w-1/6">
                                        {/* Image element dynamically sourced from state */}
                                        <span className="block w-4 sm:w-5 mt-3 ml-3 w-1/6">
                                        {isSvg ? (
                                            // Render SVG directly
                                            <svg
                                                version="1.1"
                                                id="Layer_1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                x="0"
                                                y="0"
                                                viewBox="0 0 429.6 687.2"
                                            >
                                                <path
                                                    d="M56.7 61.8c.7-1.9 1.3-3.6 1.8-5.1 100.4-39.6 212.1-39.7 312.6 0 .6 1.6 1.2 3.4 1.9 5.3 3.2 9.6 7.6 24 12 42.8 8.8 37.7 17.7 93.2 17.7 163.4s-8.9 125.7-17.7 163.4c-4.4 18.9-8.8 33.3-12 42.8-.7 2-1.3 3.8-1.9 5.3-100.4 39.6-212.2 39.6-312.6 0-.5-1.5-1.1-3.2-1.8-5.1-3.2-9.3-7.6-23.5-12-42.2C35.9 395.1 27 339.7 27 268.3S35.9 141.4 44.7 104c4.4-18.6 8.8-32.8 12-42.2z"
                                                    style={{
                                                        fill: 'none',
                                                        stroke: '#FFFFFF',
                                                        strokeWidth: 54,
                                                    }}
                                                ></path>
                                                <path
                                                    fill=""
                                                    d="M61.9 539.8c99.1 34 206.7 34 305.8 0 8.2 23.9-4.5 50.2-29.1 56.3-81.3 20.1-166.3 20.1-247.6 0-24.6-6.1-37.3-32.4-29.1-56.3z"
                                                    style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                                                ></path>
                                                <path
                                                    fill="#FFFFFF"
                                                    d="M92.1 626.3c80.6 20.1 164.8 20.1 245.4 0 6.1 24.5-8.8 49.6-33.7 53.7-58.9 9.6-119 9.6-177.9 0-25-4.1-39.9-29.2-33.8-53.7z"
                                                    style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
                                                ></path>
                                                <path
                                                    fill="#FFFFFF"
                                                    d="M297.3 231.6c20.2 0 36.6 16.4 36.6 36.6 0 20.2-16.4 36.6-36.6 36.6-20.2 0-36.6-16.4-36.6-36.6-.1-20.2 16.3-36.6 36.6-36.6z"
                                                ></path>
                                            </svg>
                                        ) : (
                                            // Render image if logoImage is a URL
                                            <img src={ImageLogo} alt="Dynamic" className="w-full h-auto" />
                                        )}                                       
                                      </span>
                                    </div>

                                    <div className="mb-12">
                                        <div className="px-6">
                                        <p className="mt-[24px] text-lg leading-[40px] font-normal font-[700]" style={{color:textColor }}>{name}</p>
                                            <p className="mt-[16px] text-mde font-normal" style={{color:textColor }}>{designation}</p>
                                          
                                        </div>
                                    </div>
                                    <div className='bg-white mx-auto rounded-md card-qrcode max-w-[138px] '>
                                       {qrCode ? 
                                       <img src={qrCode} alt='QrCode'/> : <Image src={QRImage} alt="Description" width={128} height={128} />}
                                       
                                      
                               
                                    </div>
                                </div>
                                <div className="items-center justify-center overflow-hidden flex aspect-[1033/407] my-[15px]">
                                        <span className="flex items-center px-6 w-full block aspect-[3/1]">
                                        <div className="mx-auto w-max text-[2.5rem] border-white text-center">
                                         Doorway
                                        </div>
                                        </span>
                                    </div>
                            </div>
                        </div>}
                        <div className="flex mt-[12px] justify-center gap-[22px] text-[10px] font-[500]">
                          <span className={`cursor-pointer ${cardDevice==="Apple"?'text-black underline':'text-[#BEBEBE]'}`} onClick={()=>setCardDevice('Apple')}>Apple</span>
                          <span className={`cursor-pointer ${cardDevice==="Android"?'text-black underline':'text-[#BEBEBE]'}`} onClick={()=>setCardDevice('Android')}>Android</span>
                        </div>
                    </div>
                </div>
                <div className="w-[330px] flex flex-col gap-[42px]">
                <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[25px]"
    >
      <div className="grow flex flex-col gap-[7px]">
        <label className="text-[#304861] text-[15px] font-[500]">Job Title</label>
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
        <label className="text-[#304861] text-[15px] font-[500]">Organization Name</label>
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
        <label className="text-[#304861] text-[15px] font-[500]">Organization URL*</label>
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
        {!isValidURL && <div className="text-[10px] text-red-500 text-right">Invalid URL or domain name format.</div>}
      </div>
      
      <button
        type="submit"
        disabled={!isFormValid}
        className={`${
          isFormValid ? "bg-themeColor" : "bg-gray-400 cursor-pointer"
        } text-white text-[15px] font-[500] rounded-[5px] py-[12px]`}
      >
        Submit
      </button>


    </form>
                </div>
            </div>
        </div>
    )
}

export default SetUpDoorway