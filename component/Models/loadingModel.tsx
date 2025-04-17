import LoadingSpinner from "@/assets/LoadingSpinner";
import React from "react";

const LoadingModel: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-[20px] w-[320px] md:w-[400px] p-6 shadow-xl transform transition-all">
        <div className="flex flex-col items-center space-y-4">
          <div>
            <LoadingSpinner />
          </div>
          <p className="text-center text-gray-700 text-sm">
            Please wait while we process your request...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingModel;
