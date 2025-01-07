import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/router";
import { DoorwayImages } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "@/redux/reducers/user";
import { logout } from "@/redux/reducers/auth";
import { clearCurrentDesign } from "@/redux/reducers/design";

function AuthNavbar() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    dispatch(clearCurrentUser());
    dispatch(clearCurrentDesign());
    dispatch(logout());
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
          {!state.user._id ? (
            <button
              className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-themeColor justify-right aling-center px-8`}
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-themeColor justify-right aling-center px-8`}
              onClick={handleLogout}
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
