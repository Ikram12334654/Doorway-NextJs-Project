import { RootState } from "@/redux/store";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../button";
import FieldTypeSelection from "../common/FieldTypeSelection";
import Api from "@/utils/service";
import enums from "@/utils/enums";
import { authRoutes } from "@/assets/api";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import { saveAccount } from "@/redux/reducers/account";
interface CloseModelProps {
  onClose: () => void;
}
const CompanyURL: React.FC<CloseModelProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    organizationURL: state.account.organizationURL || [
      {
        type: "work",
        value: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    organizationURL: Yup.array().of(
      Yup.object({
        value: Yup.string()
          .notRequired()
          .test("isValidURL", "Invalid URL format", (value) =>
            value ? Yup.string().url().isValidSync(value) : true
          ),
      })
    ),
  });

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

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const authToken = state.auth.accessToken;
      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updateURLs,
        "put",
        {
          payload: {
            organizationURL: values.organizationURL,
          },
        },
        authToken
      );
      setLoading(false);
      onClose();

      if (response) {
        dispatch(
          saveAccount({
            organizationURL: values.organizationURL.map((e: any) => ({
              type: e?.type || "work",
              value: e?.value,
            })),
          })
        );
        SuccessToastMessage({ message: response?.message });
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 h-full">
        <div
          className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full"
          ref={modalRef}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, dirty }) => {
              return (
                <Form>
                  <div className="flex flex-col h-full">
                    <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
                      <div className="flex-grow text-gray-950 text-small font-medium">
                        Company URLs
                      </div>
                      <button
                        className="appearance-none outline-none"
                        onClick={handleCancel}
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
                    <div className="overflow-y-auto flex-grow">
                      <div className="px-[24px] py-[32px] flex flex-col gap-[36px] w-full">
                        <div className="flex flex-col">
                          <div className="text-small font-semibold flex items-center justify-between">
                            URLs
                          </div>
                          <FieldArray name="organizationURL">
                            {({ push, remove, form }) => {
                              return (
                                <>
                                  {form.values.organizationURL.map(
                                    (_: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <FieldTypeSelection
                                          type={
                                            form.values.organizationURL[index]
                                              .type
                                          }
                                          index={index}
                                          onChanged={(newType) => {
                                            form.setFieldValue(
                                              `organizationURL[${index}].type`,
                                              newType
                                            );
                                          }}
                                          onRemove={(index) => {
                                            remove(index);
                                          }}
                                        />
                                        <Field
                                          type="text"
                                          name={`organizationURL[${index}].value`}
                                          className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                          placeholder="Enter URL"
                                        />
                                        <ErrorMessage
                                          name={`organizationURL[${index}].value`}
                                          component="div"
                                          className="text-red-500 text-sm"
                                        />
                                      </div>
                                    )
                                  )}
                                  <div className="h-[10px]" />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      push({ type: "", value: "" })
                                    }
                                    className="inline-flex items-center rounded-[6px] text-petite font-medium justify-start text-gray-500 hover:text-brand-500 focus:text-brand-500 cursor-pointer"
                                  >
                                    + Add New URL
                                  </button>
                                </>
                              );
                            }}
                          </FieldArray>
                          <div className="mt-[20px]">
                            <Button
                              title="Update"
                              disabled={loading || !dirty}
                              loading={loading}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CompanyURL;
