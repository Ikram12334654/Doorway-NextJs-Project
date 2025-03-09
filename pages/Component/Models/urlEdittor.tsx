import React, { useEffect, useRef, useState } from "react";
interface CloseModelProps {
    onClose: () => void;
}
const URLManager: React.FC<CloseModelProps> = ({ onClose }) => {
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
    // Explicitly typing the state variables
    const [urls, setUrls] = useState<{ id: number; url: string; type: string }[]>([
        { id: 1, url: "https://nextuf.store/", type: "Work" },
        { id: 2, url: "https://example.com", type: "Home" },
    ]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);  // typed as string | null
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [customValue, setCustomValue] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);  // typed as number | null

    const handleDelete = (id: number) => {
        setUrls(urls.filter((url) => url.id !== id));
    };

    const handleSelectOption = (option: string) => {
        // Update selected option
        setSelectedOption(option);

        // If "Custom" is selected, the type will be set based on the custom value
        if (option === "Custom" && customValue) {
            setUrls((prevUrls) =>
                prevUrls.map((url) =>
                    url.id === editingId ? { ...url, type: customValue } : url
                )
            );
        } else {
            // Update the type for the selected URL (if it's not "Custom")
            setUrls((prevUrls) =>
                prevUrls.map((url) =>
                    url.id === editingId ? { ...url, type: option } : url
                )
            );
        }

        // Close the dropdown after selecting an option
        setIsDropdownOpen(false);
    };

    const handleCancel = () => {
        onClose();
        // Close modal logic here
    };

    const handleCustomValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomValue(e.target.value);
    };

    const handleSave = () => {
        if (selectedOption === "Custom" && customValue) {
            setUrls((prevUrls) =>
                prevUrls.map((url) =>
                    url.id === editingId ? { ...url, type: customValue } : url
                )
            );
        } else {
            setUrls((prevUrls) =>
                prevUrls.map((url) =>
                    url.id === editingId ? { ...url, type: selectedOption || "" } : url  // Ensure selectedOption is not null
                )
            );
        }
        setIsDropdownOpen(false);
        setSelectedOption(null);
        setCustomValue("");
        setEditingId(null);
    };

    return (
        <div
            className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
            role="dialog"
            aria-modal="true"
        >
            <div className="absolute inset-0 overflow-hidden h-full" ref={modalRef}>
                <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full overflow-y-auto" ref={modalRef}>
                    <div className="flex flex-col h-full">
                        <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
                            <div className="flex-grow text-gray-950 text-small font-medium">Company URLs</div>
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
                        <div className="overflow-y-auto flex-grow">
                            <div className="px-[24px] py-[32px] flex flex-col gap-[36px] w-full">
                                <div className="flex flex-col gap-[24px]">
                                    <div className="text-small font-semibold flex items-center justify-between">URLs</div>
                                    <div className="flex flex-col gap-[12px] items-start">
                                        {urls.map((url) => (
                                            <div key={url.id} className="w-full flex flex-col gap-[4px]">
                                                <div className="flex">
                                                    <div className="flex-grow relative">
                                                        <div
                                                            className="flex items-center cursor-pointer hover:text-brand"
                                                            onClick={() => {
                                                                setSelectedOption(url.type);
                                                                setEditingId(url.id);
                                                                setIsDropdownOpen(!isDropdownOpen);
                                                            }}
                                                        >
                                                            <span className="capitalize text-petite font-medium">{url.type}</span>
                                                            <svg
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="24"
                                                                height="24"
                                                                fill="currentColor"
                                                                className="remixicon w-[16px] h-[16px]"
                                                            >
                                                                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                                                            </svg>
                                                        </div>
                                                        {isDropdownOpen && editingId === url.id && (
                                                            <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                                                <div className="p-[8px] flex flex-col gap-[8px]">
                                                                    {["Work", "Home", "Custom"].map((option) => (
                                                                        <div
                                                                            key={option}
                                                                            className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full gap-[8px]"
                                                                            onClick={() => handleSelectOption(option)}
                                                                        >
                                                                            <div className="flex items-center flex-grow gap-[8px]">
                                                                                <div className="flex flex-col gap-[4px]">
                                                                                    <span className="text-petite font-medium whitespace-nowrap">{option}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {selectedOption === "Custom" && editingId === url.id && (
                                                            <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                                                                <div className="p-[8px] flex flex-col gap-[8px]">
                                                                    <div>
                                                                        <div className="flex items-center justify-stretch gap-[10px]">
                                                                            <div className="flex-grow">
                                                                                <div className="border-[1px] rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-brand bg-white">
                                                                                    <div className="flex items-center">
                                                                                        <input
                                                                                            className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                                                            type="text"
                                                                                            value={customValue}
                                                                                            onChange={handleCustomValueChange}
                                                                                            placeholder="Enter Custom Value"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex gap-[10px]">
                                                                        <div
                                                                            className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[11px] py-[5px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                                                                            onClick={() => setIsDropdownOpen(false)}
                                                                        >
                                                                            <span className="whitespace-nowrap">Cancel</span>
                                                                        </div>
                                                                        <div
                                                                            className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[12px] py-[6px] focus:border-[2px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                                                                            onClick={handleSave}
                                                                        >
                                                                            <span className="whitespace-nowrap">Save</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div
                                                        onClick={() => handleDelete(url.id)}
                                                        className="text-gray-300 cursor-pointer hover:text-danger"
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="currentColor"
                                                            className="remixicon w-[20px] h-[20px]"
                                                        >
                                                            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-stretch gap-[10px]">
                                                    <div className="flex-grow">
                                                        <div className="border-[1px] rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-brand bg-white">
                                                            <div className="flex items-center">
                                                                <input
                                                                    className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                                                    type="url"
                                                                    value={url.url}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[16px] py-[8px] focus:border-[2px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer">
                                        <span className="whitespace-nowrap">Save</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default URLManager;
