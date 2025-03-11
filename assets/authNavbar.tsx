import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { DoorwayImages } from "./style";

function AuthNavbar() {
  const state = useSelector((state: RootState) => state);
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/login");
  };

  return (
    <nav className="w-full p-2 text-white h-max  flex ">
      <div className="w-full flex items-center justify-between">
        <div>
          <Image
            src={DoorwayImages.logo}
            alt="Logo"
            className="w-auto h-[3rem]"
          />
        </div>
        <div>
          {!state.auth ? (
            <button
              className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-themeColor justify-right aling-center px-8`}
              onClick={handleSubmit}
            >
              Login
            </button>
          ) : (
            <button
              className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-themeColor justify-right aling-center px-8`}
              onClick={handleSubmit}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
