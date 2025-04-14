import React from "react";

interface RemoveAdminModelProps {
  _id: string;
  name: string;
  onSubmit: () => void;
  onCancel: () => void;
}

const RemoveAdminModel: React.FC<RemoveAdminModelProps> = ({
  _id,
  name,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-white rounded-[20px] w-[320px] md:w-[400px] p-6 shadow-xl transform transition-all">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Remove Admin
        </h2>
        <p className="text-sm text-gray-700 mb-6 text-center">
          {`Are you sure to want to remove ${name} from Admin Access`}
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

export default RemoveAdminModel;
