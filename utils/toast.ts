import { toast } from "react-hot-toast";

interface ToastMessage {
  message: string;
}

const ErrorToastMessage = ({ message }: ToastMessage) => {
  return toast.error(message);
};
const SuccessToastMessage = ({ message }: ToastMessage) => {
  return toast.success(message);
};

export { ErrorToastMessage, SuccessToastMessage };
