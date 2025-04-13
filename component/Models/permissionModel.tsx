import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button";
import { savePermission } from "@/redux/reducers/permission";
import Api from "@/utils/service";
import { authRoutes } from "@/assets/api";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";

interface CloseModelProps {
  onClose: () => void;
}

const ToggleSwitch: React.FC<{ enabled: boolean; onToggle: () => void }> = ({
  enabled,
  onToggle,
}) => (
  <div
    className={`transition-all w-[45px] p-[5px] flex items-center justify-between rounded-[60px] cursor-pointer bg-white ${
      enabled ? "bg-green-100" : "bg-red-100"
    }`}
    onClick={onToggle}
  >
    {enabled ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-[12px] h-[11px] fill-green-700"
      >
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2"></path>
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="w-[12px] h-[11px] fill-red-700"
      >
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"></path>
      </svg>
    )}
    <div
      className={`w-[15px] h-[15px] rounded-full transition ${
        enabled ? "bg-green-300" : "bg-red-300"
      }`}
    />
  </div>
);

const PermissionModel: React.FC<CloseModelProps> = ({ onClose }) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    prefix: state.permission.prefix || false,
    sufix: state.permission.sufix || false,
    firstName: state.permission.firstName || false,
    lastName: state.permission.lastName || false,
    organizationName: state.permission.organizationName || false,
    jobTitle: state.permission.jobTitle || false,
    phones: state.permission.phones || false,
    urls: state.permission.urls || false,
    emails: state.permission.emails || false,
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async (values: any) => {
    try {
      console.log(JSON.stringify(values, null, 2));
      setLoading(true);
      const authToken = state.auth.accessToken;
      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updateUserPermissions,
        "put",
        {
          payload: values,
        },
        authToken
      );
      setLoading(false);
      onClose();

      if (response) {
        dispatch(savePermission(values));
        SuccessToastMessage({ message: response?.message });
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 inset-0 bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 overflow-hidden h-full">
        <div
          className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full flex flex-col"
          ref={modalRef}
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue, dirty }) => (
              <Form className="flex flex-col h-full">
                <div className="flex justify-between items-center mb-2 px-4 pt-4">
                  <h3 className="text-lg font-bold">User Permissions</h3>
                  <button
                    type="button"
                    onClick={onClose}
                    className="appearance-none"
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                    >
                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                    </svg>
                  </button>
                </div>

                <div className="bg-gray-100 text-black text-sm text-center p-3 rounded mx-4 mb-2">
                  Give users permission to edit selected fields themselves.
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
                  {enums.PERMISSIONS.map(({ id, label }) => (
                    <div
                      key={id}
                      className={`flex justify-between items-center p-2 rounded transition ${
                        values[id as keyof typeof values]
                          ? "bg-green-100"
                          : "bg-gray-50"
                      }`}
                    >
                      <span className="text-sm">{label}</span>
                      <ToggleSwitch
                        enabled={values[id as keyof typeof values]}
                        onToggle={() =>
                          setFieldValue(id, !values[id as keyof typeof values])
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200 bg-white">
                  <Button
                    title="Update"
                    disabled={loading || !dirty}
                    loading={loading}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PermissionModel;
