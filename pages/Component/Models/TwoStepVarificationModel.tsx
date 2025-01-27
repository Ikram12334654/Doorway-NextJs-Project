import React from 'react'
interface CloseModelProps {
  onClose: () => void;
}
const TwoStepVarificationModel: React.FC<CloseModelProps> = ({ onClose }) => {
  const handleCancel = () => {
    onClose();
    // Close modal logic here
  };
  return (
    <div
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden h-full">
        <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
              <div className="flex-grow text-gray-950 text-small font-medium">
                Setup 2FA
              </div>
              <div className="cursor-pointer" onClick={handleCancel}>
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

            {/* Content */}
            <div className="overflow-y-scroll flex-grow">
              <div className="px-6 py-8 flex flex-col gap-[18px]">
                <div className="flex flex-col gap-6">
                  {/* First Option: Email */}
                  <div
                    className="rounded-lg p-6 flex flex-col cursor-pointer"
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 12px' }}
                  >
                    <div className="card-content flex">
                      <div className="flex flex-row w-full md:w-[350px] justify-between">
                        <div className="flex gap-3">
                          <div className="rounded-md bg-brand-50 text-brand-700 p-2">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="remixicon h-5 w-5"
                            >
                              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"></path>
                            </svg>
                          </div>
                          <div className="flex items-center text-petite font-semibold">Email</div>
                        </div>
                        <div className="flex items-center text-gray text-petite font-medium cursor-pointer">
                          {/* Empty div to maintain structure */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Option: One-Time Password Generator */}
                  <div
                    className="rounded-lg p-6 flex flex-col cursor-pointer"
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 12px' }}
                  >
                    <div className="card-content flex">
                      <div className="flex flex-row w-full md:w-[350px] justify-between">
                        <div className="flex gap-3">
                          <div className="rounded-md bg-brand-50 text-brand-700 p-2">
                            <svg
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="remixicon h-5 w-5"
                            >
                              <path d="M16 17V16H13V13H16V15H18V17H17V19H15V21H13V18H15V17H16ZM21 21H17V19H19V17H21V21ZM3 3H11V11H3V3ZM5 5V9H9V5H5ZM13 3H21V11H13V3ZM15 5V9H19V5H15ZM3 13H11V21H3V13ZM5 15V19H9V15H5ZM18 13H21V15H18V13ZM6 6H8V8H6V6ZM6 16H8V18H6V16ZM16 6H18V8H16V6Z"></path>
                            </svg>
                          </div>
                          <div className="flex items-center text-petite font-semibold">
                            One-Time Password Generator
                          </div>
                        </div>
                        <div className="flex items-center text-gray text-petite font-medium cursor-pointer">
                          {/* Empty div to maintain structure */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoStepVarificationModel