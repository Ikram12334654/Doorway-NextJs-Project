import { authRoutes } from "@/assets/api";
import LoadingSpinner from "@/assets/LoadingSpinner";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "../button";
import FieldTypeSelection from "../common/FieldTypeSelection";

interface CloseModelProps {
  onClose: () => void;
  extra?: boolean;
}

const DoorwayDetailsModel: React.FC<CloseModelProps> = ({
  onClose,
  extra = false,
}) => {
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

  const state = useSelector((state: RootState) => state);

  const [loading, setLoading] = useState(false);

  const initialValues = {
    doorwayName: state.user.doorwayName || "",
    prefix: state.user.prefix || "",
    sufix: state.user.sufix || "",
    firstName: state.user.firstName || "",
    lastName: state.user.lastName || "",
    jobTitle: state.user.jobTitle || "",
    company: state.account.organizationName || "",
    emails: state.user.emails || [
      {
        type: "",
        value: "",
      },
    ],
    phones: state.user.phones || [
      {
        type: "",
        value: "",
      },
    ],
    urls: state.user.urls || [
      {
        type: "",
        value: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    doorwayName: Yup.string()
      .required("Doorway Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed"),
    prefix: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .optional(),
    sufix: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .optional(),
    jobTitle: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .optional(),
    company: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .optional(),
    emails: Yup.array().of(
      Yup.object({
        value: Yup.string()
          .notRequired()
          .test("isValidEmail", "Invalid email format", (value) =>
            value ? Yup.string().email().isValidSync(value) : true
          ),
      })
    ),
    phoneNumbers: Yup.array().of(
      Yup.object({
        value: Yup.string()
          .notRequired()
          .test("isValidPhone", "Only numbers are allowed", (value) =>
            value ? /^\d+$/.test(value) : true
          ),
      })
    ),
    urls: Yup.array().of(
      Yup.object({
        value: Yup.string()
          .notRequired()
          .test("isValidURL", "Invalid URL format", (value) =>
            value ? Yup.string().url().isValidSync(value) : true
          ),
      })
    ),
  });

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async ({ values }: any) => {
    try {
      setLoading(true);

      const authToken = state.auth.accessToken;

      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updatePersonal,
        "put",
        {
          payload: {
            doorwayName: values?.doorwayName,
            prefix: values?.prefix,
            sufix: values?.sufix,
            firstName: values?.firstName,
            lastName: values?.lastName,
            jobTitle: values?.jobTitle,
            company: values?.company,
            emails: values?.emails,
            phones: values?.phones,
            urls: values?.urls,
          },
        },
        authToken
      );

      setLoading(false);
      onClose();

      if (response) {
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
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          handleSubmit({ values });
          resetForm();
        }}
      >
        {({ isSubmitting, isValid, values, setFieldValue, dirty }) => (
          <Form>
            <div className="absolute inset-0 overflow-hidden h-full">
              <div
                className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full "
                ref={modalRef}
              >
                <div className="flex flex-col h-full">
                  <div className="p-[22px] flex gap-[12px] border-b border-b-gray-100 items-center">
                    <div className="flex-grow text-gray-950 text-small font-medium">
                      {state.user.doorwayName || "Doorway Details"}
                    </div>
                    <div className="cursor-pointer" onClick={onClose}>
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="remixicon text-gray-400"
                      >
                        <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="overflow-y-scroll flex-grow">
                    <div
                      className={`px-[24px] py-[32px] flex flex-col gap-[36px] w-full`}
                    >
                      <div className="flex flex-col gap-6">
                        <div>
                          <div className="flex flex-col gap-[24px]">
                            <div className="text-small font-semibold flex justify-between items-center">
                              Management Information
                              <span className="px-[8px] py-[4px] bg-brand-50 border-brand-100 text-brand-500 border-[1px] text-tiny font-medium rounded-[4px] truncate">
                                Primary
                              </span>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                              <div className="flex flex-col gap-[4px] flex-1 min-w-0 max-w-full">
                                <div className="flex items-center justify-between">
                                  <div className="text-petite font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                    Doorway Name *
                                  </div>
                                </div>
                                <div className="border-[1px] rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white">
                                  <Field
                                    type="text"
                                    name="doorwayName"
                                    className="border-box bg-transparent text-petite border-0 ring-transparent outline-none focus:outline-none focus:ring-0 w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                    placeholder="Doorway Name"
                                  />
                                </div>
                              </div>
                              <ErrorMessage
                                name="doorwayName"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="border-b border-gray-100 mt-[36px]"></div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <div className="flex justify-between items-center text-small font-semibold">
                            <span>Contact Information</span>
                          </div>
                          <div className="flex gap-[12px] max-w-full">
                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                Prefix
                              </div>
                              <Field
                                type="text"
                                name="prefix"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter Prefix"
                              />
                              <ErrorMessage
                                name="prefix"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                Suffix
                              </div>
                              <Field
                                type="text"
                                name="sufix"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter Suffix"
                              />
                              <ErrorMessage
                                name="sufix"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex gap-[12px] max-w-full">
                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                First Name *
                              </div>
                              <Field
                                type="text"
                                name="firstName"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter First Name"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                Last Name *
                              </div>
                              <Field
                                type="text"
                                name="lastName"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter Last Name"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex gap-[12px] max-w-full">
                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                Job Title
                              </div>
                              <Field
                                type="text"
                                name="jobTitle"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter Job Title"
                              />
                              <ErrorMessage
                                name="jobTitle"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>

                            <div className="flex-1">
                              <div className="text-petite font-medium">
                                Company
                              </div>
                              <Field
                                type="text"
                                name="company"
                                className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                placeholder="Enter Company"
                              />
                              <ErrorMessage
                                name="company"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="text-petite font-medium">Emails</div>
                          <FieldArray name="emails">
                            {({ push, remove, form }) => {
                              return (
                                <>
                                  {form.values.emails.map(
                                    (_: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <FieldTypeSelection
                                          type={form.values.emails[index].type}
                                          index={index}
                                          onChanged={(newType) => {
                                            form.setFieldValue(
                                              `emails[${index}].type`,
                                              newType
                                            );
                                          }}
                                          onRemove={(index) => {
                                            remove(index);
                                          }}
                                        />
                                        <Field
                                          type="text"
                                          name={`emails[${index}].value`}
                                          className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                          placeholder="Enter Email"
                                        />
                                        <ErrorMessage
                                          name={`emails[${index}].value`}
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
                                    + Add New Email
                                  </button>
                                </>
                              );
                            }}
                          </FieldArray>
                          <div className="h-[25px]" />
                          <div className="text-petite font-medium">
                            Phone Numbers
                          </div>
                          <FieldArray name="phones">
                            {({ push, remove, form }) => {
                              return (
                                <>
                                  {form.values.phones.map(
                                    (_: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <FieldTypeSelection
                                          type={form.values.phones[index].type}
                                          index={index}
                                          onChanged={(newType) => {
                                            form.setFieldValue(
                                              `phones[${index}].type`,
                                              newType
                                            );
                                          }}
                                          onRemove={(index) => {
                                            remove(index);
                                          }}
                                        />
                                        <Field
                                          type="tel"
                                          name={`phones[${index}].value`}
                                          className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                          placeholder="Enter Phone Number"
                                        />
                                        <ErrorMessage
                                          name={`phones[${index}].value`}
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
                                    + Add New Phone Number
                                  </button>
                                </>
                              );
                            }}
                          </FieldArray>
                          <div className="h-[25px]" />
                          <div className="text-petite font-medium">URLs</div>
                          <FieldArray name="urls">
                            {({ push, remove, form }) => {
                              return (
                                <>
                                  {form.values.urls.map(
                                    (_: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <FieldTypeSelection
                                          type={form.values.urls[index].type}
                                          index={index}
                                          onChanged={(newType) => {
                                            form.setFieldValue(
                                              `urls[${index}].type`,
                                              newType
                                            );
                                          }}
                                          onRemove={(index) => {
                                            remove(index);
                                          }}
                                        />
                                        <Field
                                          type="text"
                                          name={`urls[${index}].value`}
                                          className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                                          placeholder="Enter URL"
                                        />
                                        <ErrorMessage
                                          name={`urls[${index}].value`}
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[24px] py-[16px] flex gap-[24px] border-t border-t-gray-100 items-center">
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
                        <div className="w-[80px]">
                          <Button title="Update" disabled={loading || !dirty} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoorwayDetailsModel;
