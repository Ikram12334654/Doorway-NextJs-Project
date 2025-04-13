import { authRoutes } from "@/assets/api";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

interface CloseModelProps {
  onClose: () => void;
}

const ChangePasswordModal: React.FC<CloseModelProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const state = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);

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

  interface FormValues {
    currentPassword: string;
    newPassword: string;
  }

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleUpdatePassword = async ({ values }: { values: FormValues }) => {
    try {
      setLoading(true);

      const authToken = state.auth.accessToken;

      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updatePassword,
        "put",
        {
          payload: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        },
        authToken
      );

      setLoading(false);

      if (response) {
        SuccessToastMessage({ message: response?.message });
        onClose();
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const passwordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
  });

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
          <div className="flex flex-col h-full">
            <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
              <div className="flex-grow text-gray-950 text-small font-medium">
                Change Password
              </div>
              <div className="cursor-pointer" onClick={onClose}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="remixicon text-gray-300"
                >
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
                </svg>
              </div>
            </div>

            <Formik
              initialValues={{ currentPassword: "", newPassword: "" }}
              onSubmit={(values, { resetForm }) => {
                handleUpdatePassword({ values });
                resetForm();
              }}
              validationSchema={passwordValidationSchema}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form className="flex flex-col h-full">
                  <div className="overflow-y-auto flex-grow px-6 py-8 flex flex-col gap-[18px]">
                    <div className="flex flex-col gap-[4px]">
                      <label className="text-petite font-medium">
                        Current Password
                      </label>
                      <div className="border-[1px] rounded-[6px] text-gray-950 border-gray-100 focus-within:border-themeColor bg-white">
                        <Field
                          className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                          autoComplete="new-password"
                          type="password"
                          name="currentPassword"
                          value={values.currentPassword}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.currentPassword && errors.currentPassword && (
                        <div className="text-red-500 text-tiny">
                          {errors.currentPassword}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <label className="text-petite font-medium">
                        New Password
                      </label>
                      <div className="border-[1px] rounded-[6px] text-gray-950 border-gray-100 focus-within:border-themeColor bg-white">
                        <Field
                          className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                          autoComplete="new-password"
                          type="password"
                          name="newPassword"
                          value={values.newPassword}
                          onChange={handleChange}
                        />
                      </div>
                      {touched.newPassword && errors.newPassword && (
                        <div className="text-red-500 text-tiny">
                          {errors.newPassword}
                        </div>
                      )}
                    </div>

                    <span className="text-tiny font-regular text-gray-500 block">
                      Make sure it’s at least 8 characters and includes a
                      special character, a number, an uppercase, and a lowercase
                      letter.
                    </span>
                  </div>

                  <div className="sticky bottom-0 bg-white px-[24px] py-[16px] flex gap-[24px] border-t border-t-gray-100 items-center z-10">
                    <div className="flex-grow text-gray-950 text-small font-medium flex justify-end gap-[16px]">
                      <div
                        className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[15px] py-[7px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                        onClick={onClose}
                      >
                        <span className="whitespace-nowrap">Cancel</span>
                      </div>
                      {loading ? (
                        <LoadingSpinner />
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out px-[16px] py-[8px] bg-brand-100 cursor-pointer"
                        >
                          <span className="whitespace-nowrap">
                            Update Password
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
