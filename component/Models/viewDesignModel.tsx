import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import UserPass from "../UserPass";

interface ViewDesignModelProps {
  onClose: () => void;
  values: any;
}

const ViewDesignModel: React.FC<ViewDesignModelProps> = ({
  onClose,
  values,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="relative w-[360px] max-w-full min-w-[300px]">
        <button
          onClick={onClose}
          className="w-[35px] h-[35px] absolute -top-3 -right-3 z-20 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition flex items-center justify-center"
        >
          <CloseIcon fontSize="medium" />
        </button>
        <UserPass values={values} />
      </div>
    </div>
  );
};

export default ViewDesignModel;
