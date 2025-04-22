import React, { useEffect, useRef, useState } from 'react'
interface CloseModelProps {
    onClose: () => void;
    type: string
}
const
    TwoStepVarificationEmailModel: React.FC<CloseModelProps> = ({ onClose, type }) => {
        const [timer, setTimer] = useState(60);
        const [value, setValue] = useState(''); // State to hold the combined input value as a single string

        const handleInputChange = (index: number, char: string) => {
          if (char.length > 1) return; // Prevent multiple characters from being entered
      
          // Update the value at the specific index
          const newValue = value.slice(0, index) + char + value.slice(index + 1);
          setValue(newValue);
      
          // Auto-focus to the next input if a value is entered
          if (char && index < 5) {
            const nextInput = document.getElementById(`input-${index + 1}`);
            if (nextInput) {
              nextInput.focus(); // Null check before focusing
            }
          }
        };
      
        const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Backspace' && !value[index] && index > 0) {
            const prevInput = document.getElementById(`input-${index - 1}`);
            if (prevInput) {
              prevInput.focus(); // Move focus to the previous input
            }
          }
        };
        useEffect(() => {
            if (timer <= 0) return;

            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval);
        }, [timer]);
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
                    <div className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full" ref={modalRef}>
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
                            {type === "email" && <div className="overflow-y-scroll flex-grow">
                                <div className="px-6 py-8">
                                    <div className="flex flex-col gap-6 items-center">
                                        {/* Info Text */}
                                        <p className="text-xs text-center text-gray-600">
                                            Please enter the code we sent by email at{" "}
                                            <span className="font-semibold text-gray-900">sami_ullah71@outlook.com</span>
                                        </p>

                                        {/* Verification Code Input */}
                                        <div className="flex justify-center">
                                                <div className="relative w-min">
                                                    {/* Visible Input Fields */}
                                                    <div className="flex gap-2 h-12 w-[300px]">
                                                        {Array.from({ length: 6 }).map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex-1 h-full text-center text-3xl leading-[3rem] border border-slate-300 bg-[#F2F5F5] text-black rounded flex items-center justify-center"
                                                            >
                                                                {/* Input Field Inside Each Div */}
                                                                <input
                                                                    id={`input-${i}`}
                                                                    type="text"
                                                                    maxLength={1}
                                                                    value={value[i] || ''} // Use the character at the current index
                                                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                                                    onKeyDown={(e) => handleBackspace(i, e)} // Handle backspace key
                                                                    className="w-full h-full text-center text-3xl bg-transparent border-0 outline-none text-black"
                                                                    style={{ caretColor: 'transparent' }} // Hide the cursor
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                        {/* Timer */}
                                        {timer > 0 ? (
                                            <p className="text-xs text-gray-500">
                                                You will be able to request a new code in {timer} second{timer !== 1 && "s"}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-green-600 font-medium">
                                                You can now request a new code
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>}
                            {type === "QrCode" && (
                                <div className="overflow-y-scroll flex-grow">
                                    <div className="px-6 py-8">
                                        <div className="flex flex-col gap-6 items-center text-xs">
                                            {/* QR Code / SVG Placeholder */}
                                            <div className="flex justify-center">
                                                <svg height="120" width="120" viewBox="0 0 45 45">
                                                    {/* You can replace this with an actual QR code generator */}
                                                    <rect width="45" height="45" fill="white" />
                                                    <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="10" dy=".3em">QR Code</text>
                                                </svg>
                                            </div>

                                            {/* Setup Key */}
                                            <div className="flex gap-1 justify-center">
                                                <span>Setup key:</span>
                                                <span className="font-semibold break-all">OCS54SZWXZW6E75AZ6O5BTZZC7I7TTV2</span>
                                            </div>

                                            {/* Instructions */}
                                            <div className="text-center">
                                                Please install a two-factor authentication application, such as Google Authenticator or Authy,
                                                scan the QR code or copy the setup key, and then enter the generated authentication code below.
                                            </div>

                                            {/* Verification Code Input */}
                                            <div className="flex justify-center">
                                                <div className="relative w-min">
                                                    {/* Visible Input Fields */}
                                                    <div className="flex gap-2 h-12 w-[300px]">
                                                        {Array.from({ length: 6 }).map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex-1 h-full text-center text-3xl leading-[3rem] border border-slate-300 bg-[#F2F5F5] text-black rounded flex items-center justify-center"
                                                            >
                                                                {/* Input Field Inside Each Div */}
                                                                <input
                                                                    id={`input-${i}`}
                                                                    type="text"
                                                                    maxLength={1}
                                                                    value={value[i] || ''} // Use the character at the current index
                                                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                                                    onKeyDown={(e) => handleBackspace(i, e)} // Handle backspace key
                                                                    className="w-full h-full text-center text-3xl bg-transparent border-0 outline-none text-black"
                                                                    style={{ caretColor: 'transparent' }} // Hide the cursor
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default TwoStepVarificationEmailModel