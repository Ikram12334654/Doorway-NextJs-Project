import React from 'react'
interface CloseModelProps {
    onClose: () => void;
}

const DoorwayDetailsModel: React.FC<CloseModelProps> = ({ onClose }) => {
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
                                Doorway Details
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
                            <div className="px-[24px] py-[32px] flex flex-col gap-[36px] w-full">
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-center text-small font-semibold">
                                        <span>Management Information</span>
                                        <span className="px-2 py-1 bg-brand-50 border-brand-100 text-brand-500 border text-tiny font-medium rounded truncate">
                                            Primary
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-5">
                                        <div className="flex justify-between">
                                            <div className="text-petite font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                                Doorway Name <span className="text-danger-600">*</span>
                                            </div>
                                            <div className="w-[50px]" />
                                        </div>

                                        <div className="flex gap-2">
                                            <div className="flex-grow border rounded-6 overflow-hidden text-gray-950 border-gray-100 focus-within:border-brand bg-white">
                                                <input
                                                    className="border-0 focus bg-transparent text-petite focus:outline-none w-full px-3 py-2 placeholder-gray-300"
                                                    type="text"
                                                    value="Default Doorway"
                                                    
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-100 mt-[36px]" />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-[24px] py-[16px] flex gap-[24px] border-t border-t-gray-100 items-center">
                            <div className="flex-grow text-gray-950 text-small font-medium flex justify-end gap-[16px]">
                                <div
                                    className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[15px] py-[7px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                                    onClick={handleCancel}
                                >
                                    <span className="whitespace-nowrap">Cancel</span>
                                </div>
                                <button
                                    type="submit"
                                    className={`inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] 
                        bg-brand-100
                      cursor-pointer`}
                                >
                                    <span className="whitespace-nowrap">Update Password</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoorwayDetailsModel