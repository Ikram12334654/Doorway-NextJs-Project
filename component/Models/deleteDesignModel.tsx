import React from "react";

interface DeleteDesignModelProps {
  _id: string;
  name: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const DeleteDesignModel: React.FC<DeleteDesignModelProps> = ({
  _id,
  name,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-[20px] w-[320px] md:w-[400px] p-6 shadow-xl transform transition-all">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Delete Design
        </h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          Are you sure you want to remove{" "}
          <span className="font-semibold">{name}</span> from Designs?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-themeColor text-white font-medium rounded-[20px] shadow-md"
          >
            Submit
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-[#FF0000B3] text-white font-medium rounded-[20px] shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDesignModel;
