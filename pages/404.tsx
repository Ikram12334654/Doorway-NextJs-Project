import Image from "next/image";
import Link from "next/link";
import AuthNavbar from "../assets/authNavbar";
import { DoorwayImages } from "../assets/style";

function Error() {
  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      <div className="w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

      <div className="h-screen w-1/2 flex justify-center items-center md:hidden bg-themeColor">
        <Image
          src={DoorwayImages.logo}
          alt="logos"
          className="h-auto w-[330px] lg:w-[270px]"
        />
      </div>
      <div className="flex flex-col w-1/2 md:w-1/2 h-full bg-white items-center justify-center text-center p-6">
        <h1 className="text-4xl md:text-5xl font-normal text-black uppercase mb-6">
          404 Not Found
        </h1>
        <Link href="/login">
          <p className="bg-black text-white px-6 py-3 rounded-lg shadow-lg text-xs hover:bg-gray-800 transition cursor-pointer">
            Go Home
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Error;
