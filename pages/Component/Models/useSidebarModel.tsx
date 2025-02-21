import { useState, useRef, useEffect, useCallback } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import toast from "react-hot-toast";
import DoorwayDetailsModel from "./DoorwayDetailsModel";
import AddNewDoorwayModel from "./AddNewDoorway";

// Define the type for doorway data
interface Doorway {
  name: string;
  type: "Primary" | "Secondary";
  status: "Invited" | "Not Invited";
}

// Define the props for the component
interface UserProfileProps {
  doorways: Doorway[]; // Data fetched from the API
  userId: string; // User ID to fetch specific data
  onClose: () => void; // Function to close the modal
}

const UserProfile: React.FC<UserProfileProps> = ({ doorways, userId, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);
  
    // Handle clicks outside the modal
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          onClose(); // Close the modal if clicked outside
        }
      };
  
      // Add event listener for clicks
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup the event listener on unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
  // Determine if the "New Doorway" button should have a different background
  const isButtonDisabled = doorways.length >= 3;

  // State to manage the visibility of the full link section
  const [showFullLink, setShowFullLink] = useState(false);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const menuRef = useRef(null);

  const [isDoorwayDetailsOpen, setIsDoorwayDetailsOpen] = useState(false);
  const [isAddDoorwayOpen, setIsAddDoorwayOpen] = useState(false);

  const handleEditClick = () => {
    setIsDoorwayDetailsOpen(true);
   
  };

  const handleAddDoorwayClick = () => {
    setIsAddDoorwayOpen(true); 

  };

  // Toggle menu visibility
  const toggleMenu = (index: number) => {
    setIsOpen(isOpen === index ? null : index);
  };

  // const handleClickOutside = useCallback((event) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target)) {
  //     setIsOpen(false);
  //   }
  // }, []);
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [handleClickOutside]);


  // Function to copy the link to the clipboard
  const copyToClipboard = () => {
    const link = "https://app.doorway.io/claim-doorway?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1pX3VsbGFoNzFAb3V0bG9vay5jb20iLCJ0eXAiOiJpbnZpdGUiLCJleHAiOjE3NzExNzcxNjN9.6qOuJRBE_ZzaO0t-QhSae9nZnV7MwV2X97fUJrOfgKY";
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Failed to copy link."));
  };

  return (
    <div
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
    
      aria-modal="true"
    >
      <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full" ref={modalRef}>
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
            <div className="bg-brand-200 text-brand-500 rounded-full flex items-center justify-center w-[40px] h-[40px] text-petite font-medium">
              SU
            </div>
            <div className="flex-grow text-gray-950 text-small font-medium">Sami Ullah</div>
            <div className="cursor-pointer" onClick={onClose}>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon text-gray-300"
              >
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </div>
          </div>

          {/* Content Section */}
          <div className="overflow-y-scroll flex-grow">
            <div className="px-[24px] py-[32px] flex flex-col gap-[32px]">
              {/* Doorways Section */}
              <div className="flex gap-[24px] flex-col">
                <div className="flex items-center justify-between">
                  <div className="text-small font-semibold">Doorways</div>
                  <div
                    className={`items-center inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] ${isButtonDisabled ? "bg-green-400 cursor-default" : "bg-brand-500 hover:bg-brand-600 cursor-pointer"
                      } text-white `}
                    role="button"
                    onClick={()=>handleAddDoorwayClick()}  
                  >
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="remixicon w-[20px] h-[20px]"
                    >
                      <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>
                    <span className="whitespace-nowrap">New Doorway</span>
                  </div>
                </div>

                {/* Doorway Cards */}
                <div className="flex flex-col gap-[12px]">
                  {doorways.map((doorway, index) => (
                    <div
                      key={index}
                      className="w-full flex rounded-[6px] px-[24px] py-[24px] gap-[24px]"
                      style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 12px 0px" }}
                    >
                      <div className="flex-grow flex flex-col gap-[8px]">
                        <div className="flex gap-[12px]">
                          <span className="text-petite font-bold cursor-pointer">{doorway.name}</span>
                          <span
                            className={`px-[8px] ${doorway.type === "Primary"
                                ? "bg-brand-50 border-brand-100 text-brand-500"
                                : "bg-gray-50 border-gray-100 text-gray-500"
                              } border-[1px] text-tiny font-medium rounded-[4px] truncate !px-[8px] !py-[2px]`}
                          >
                            {doorway.type}
                          </span>
                        </div>
                        <div className="flex gap-[12px] items-center">
                          <span className="text-tiny font-regular">Default Doorway</span>
                          <div className="text-sm font-medium flex items-center gap-[4px] text-gray-500 truncate">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill={`${doorway.status === "Invited" ? "yellow" : "red"}`}
                            >
                              <circle
                                cx="8"
                                cy="8"
                                r="5"
                                className={`${doorway.status === "Invited"
                                    ? "fill-yellow-700 stroke-yellow-100"
                                    : "fill-red-700 stroke-red-100"
                                  }`}
                                strokeWidth="4"
                              ></circle>
                            </svg>
                            {doorway.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="relative">
                          <div>
                            <div
                              className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] p-[6px] focus:border-[2px] text-gray-500 bg-transparent hover:text-brand-500 hover:bg-brand-100 focus:bg-brand-100 focus:text-brand-500 focus:border-brand-300 cursor-pointer"
                              onClick={() => toggleMenu(index)}
                            >
                              <MoreVertIcon fontSize="medium" />
                            </div>
                          </div>
                          {isOpen === index && (
                            <div
                              ref={menuRef}
                              className="rounded-[6px] bg-white absolute top-10 right-0 shadow-md p-2 w-48"
                            >
                              <div className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-3 py-2 flex items-center gap-2"
                              onClick={handleEditClick}>
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                >
                                  <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                                </svg>
                                <span className="text-sm font-medium">Edit</span>
                              </div>

                              <div className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-3 py-2 flex items-center gap-2">
                                <svg
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                >
                                  <path d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"></path>
                                </svg>
                                <span className="text-sm font-medium">Resend Doorway</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* User’s Download Link Section */}
              <div className="flex gap-[24px] flex-col">
                <div className="text-small font-semibold">User’s Download Link</div>
                <div className="flex gap-[16px] flex-row">
                  <div
                    className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[15px] py-[9px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                    onClick={() => setShowFullLink(!showFullLink)}
                  >
                    <span className="whitespace-nowrap">View Full Link</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-[10px] cursor-pointer">
                      <div
                        className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[10px] focus:border-[2px] text-gray-500 bg-transparent hover:text-brand-500 hover:bg-brand-100 focus:bg-brand-100 focus:text-brand-500 focus:border-brand-300 cursor-pointer"
                        onClick={copyToClipboard}
                      >
                        <span className="whitespace-nowrap">Copy to Clipboard</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Link Section */}
                {showFullLink && (
                  <div className="flex gap-[16px] flex-col">
                    <div className="w-full">
                      <div className="flex items-center justify-stretch gap-[10px]">
                        <div className="flex-grow">
                          <div className="border-[1px] focus:border-themeColor rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-brand bg-white">
                            <div className="flex items-center">
                              <div className="bg-gray-50 h-[38px] text-gray-950 w-fit px-[12px] shrink-0 grow-0 border-r-[1px] border-r-gray-100 flex items-center justify-center text-petite font-regular">
                                https://
                              </div>
                              <input
                                className="border-box focus bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                type="text"
                                value="app.doorway.io/claim-doorway?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzYW1pX3VsbGFoNzFAb3V0bG9vay5jb20iLCJ0eXAiOiJpbnZpdGUiLCJleHAiOjE3NzExNzcxNjN9.6qOuJRBE_ZzaO0t-QhSae9nZnV7MwV2X97fUJrOfgKY"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Information Section */}
              <div className="flex gap-[24px] flex-col">
                <div className="text-small font-semibold">Account Information</div>
                <div className="flex flex-col gap-[24px]">
                  <div className="flex-[1] flex flex-col">
                    <div className="text-petite font-medium">Account Email</div>
                    <div className="text-petite font-light">sami_ullah71@outlook.com</div>
                  </div>
                  <div className="flex">
                    <div className="flex-[1] flex flex-col">
                      <div className="text-petite font-medium">Role</div>
                      <div className="text-petite font-light">Administrator</div>
                    </div>
                    <div className="flex-[1] flex flex-col">
                      <div className="text-petite font-medium">2FA</div>
                      <div className="text-petite font-light">None</div>
                    </div>
                  </div>
                  <div className="flex-[1] flex flex-col">
                    <div className="text-petite font-medium">Administrative Units</div>
                    <div className="text-petite font-light">None</div>
                  </div>
                </div>
              </div>

              {/* Delete User Section */}
              <div className="flex flex-col gap-[24px] justify-center mb-4">
                <div className="border-b border-gray-100"></div>
                <div className="text-center">
                  <div className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] text-red-500 hover:bg-red-50 focus:border-[2px] focus:border-danger-200 cursor-pointer">
                    <span className="whitespace-nowrap">Delete User</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDoorwayDetailsOpen && <DoorwayDetailsModel onClose={() => setIsDoorwayDetailsOpen(false)} />}
      {isAddDoorwayOpen && <AddNewDoorwayModel onClose={() => setIsAddDoorwayOpen(false)} />}
    </div>
  );
};

export default UserProfile;