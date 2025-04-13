import React, { useEffect, useRef } from "react";

interface CloseModelProps {
  onClose: () => void;
}

const PaymentModel: React.FC<CloseModelProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden h-full">
        <div
          className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full"
          ref={modalRef}
        >
          <div className="relative w-screen max-w-md h-screen bg-white shadow-xl p-4">
            <div className="flex justify-between items-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModel;
