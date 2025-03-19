import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CloseModelProps {
  onClose: () => void;
}

const DoorwayPanel: React.FC<CloseModelProps> = ({ onClose }) => {
  const [maxDoorways, setMaxDoorways] = useState<string>("1");
  const [model, setModel] = useState<boolean>(false);
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
  const handleSelectChange = (value: string) => {
    setMaxDoorways(value);
    setModel(false); // Close dropdown after selection
  };

  const handleUpdate = () => {
    // Implement the update logic
    console.log(`Max doorways per user updated to: ${maxDoorways}`);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden h-full">
        <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full overflow-y-auto" ref={modalRef}>
          <div className="relative w-screen h-screen max-w-md">
            <div className="h-full flex flex-col pb-6 pt-3 bg-white shadow-xl overflow-y-scroll">
              <div className="relative flex-1 px-4 sm:px-6">
                <div className="flex items-center justify-between pb-4 pt-2">
                  <button className="appearance-none outline-none" type="button" onClick={handleCancel}>
                    <span className="sr-only">Close panel</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor">
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                    </svg>
                  </button>
                </div>

                <h3 className="font-heading text-xl min-md:text-2xl mb-4">Multiple Doorways</h3>

                <div className="my-4">
                  <div className="text-navyBlue leading-regular flex cursor-default items-center gap-[5px] text-[15px] min-md:text-[13px] text-navyBlue">
                    <div className="flex items-center gap-[5px] font-[500]">
                      <div className="flex items-center">
                        Max Doorways per User<span></span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    {/* Custom Dropdown Button */}
                    <div
                      className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-[#1ed761] cursor-pointer"
                      role="button"
                      onClick={() => setModel(!model)}
                    >
                      <span>{maxDoorways === "1" ? "1" : "2"}</span>
                      <ArrowDropDownIcon className="text-gray-600" />
                    </div>

                    {/* Dropdown List */}
                    {model && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <ul className="list-none p-0 m-0">
                          <li
                            className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-brand-300 hover:text-white hover:font-semibold"
                            onClick={() => handleSelectChange("1")}
                          >
                            1
                          </li>
                          <li
                            className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-brand-300 hover:text-white hover:font-semibold"
                            onClick={() => handleSelectChange("2")}
                          >
                            2
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="rounded-regular focus:outline-none focus:ring-transparent w-full bg-brand-500 hover:bg-brand-500 text-white text-legacy-regular py-[10px] px-[10px] rounded-md px-7"
                    type="button"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoorwayPanel;
