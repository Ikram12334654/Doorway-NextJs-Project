import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Use next/router instead
import {DoorwayImages} from './style'
import { RootState } from "@/redux/store";
import { useSelector } from 'react-redux';
function AuthNavbar() {
  const state = useSelector((state: RootState) => {
    return state;
  });
  const router = useRouter(); // To get the current route
  const isLoginPage = router.pathname === '/login'; // Check if the current path is '/login'
  // Function to handle the button click
  const handleLoginRedirect = () => {
    router.push('/login'); // Navigate to the next page (replace '/next-page' with your actual route)
  };
  console.log(state.registration.steps)
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
          {state.registration.steps===1 ?         <button
          className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-themeColor justify-right aling-center px-8`}
          disabled={isLoginPage}
          onClick={handleLoginRedirect} // Disable button if on login page
        >
          Login
        </button>:        <button
          className={`px-4 py-2 bg-blue-500 rounded disabled:bg-gray-400 flex bg-white text-gray-400 font-bold justify-right aling-center px-8`}
          disabled={isLoginPage}
          onClick={handleLoginRedirect} // Disable button if on login page
        >
          Logout
        </button>}
        </div>
      </div>
    </nav>
  );
}

export default AuthNavbar;
