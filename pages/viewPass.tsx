import { DoorwayImages } from "@/assets/style";
import UserPass from "@/component/UserPass";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import WestIcon from "@mui/icons-material/West";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ViewPass: React.FC = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);

  const data = {
    prefix: "Dr.",
    sufix: "Mughal",
    firstName: "Sami",
    lastName: "Ullah",
    jobTitle: "CTO",
    organizationName: "Doorway",
    organizationURL: "https://abc@gmail.com",
    backgroundColor: "#FF0000",
    stripImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VqsGmTi8ZbzdxdJqq3oRmDgzdSHXEB5Gzg&s",
    logoImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2VqsGmTi8ZbzdxdJqq3oRmDgzdSHXEB5Gzg&s",
    emails: [
      {
        value: "hello@gmail.com",
        type: "work",
      },
    ],
    phones: [{ value: "03037983474", type: "work" }],
    URLS: [
      {
        value: "https://google.com",
        type: "hello@gmail.com",
      },
    ],
    addresses: [
      {
        value: "Lahore",
        type: "Home",
      },
    ],
    passType: enums.PASS_VIEW.ANDROID,
  };

  return (
    <>
      {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
        <div className="w-screen h-screen flex flex-row md:flex-col">
          <div className="relative h-screen w-1/2 flex justify-center items-center md:hidden bg-themeColor">
            <button
              onClick={() => router.back()}
              className="absolute top-10 left-10 flex items-center text-white hover:text-gray-200"
            >
              <WestIcon fontSize="small" />
              <span className="ml-1">Back</span>
            </button>
            <Image
              src={DoorwayImages.logo}
              alt="logos"
              className="h-auto w-[330px] lg:w-[270px]"
            />
          </div>
          <div className="flex h-screen w-1/2 md:w-screen justify-center items-center bg-white/70 backdrop-blur-sm">
            <UserPass values={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewPass;
