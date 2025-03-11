import { saveAccount } from "@/redux/reducers/account";
import { saveDesign } from "@/redux/reducers/design";
import { saveUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { authRoutes } from "@/utils/routes";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "./button";
import PassPreview from "./passPreview";

const CustomizeYourDesign: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    color: state.design.backgroundColor || "#22242C",
    organization: "",
    orgUrl: "",
    jobTitle: "",
    emails: [
      {
        type: "work",
        value: "",
      },
    ],
    phoneNumbers: [
      {
        type: "work",
        value: "",
      },
    ],
    urls: [
      {
        type: "work",
        value: "",
      },
    ],
  };

  const validationSchema = Yup.object({
    color: Yup.string().required("Color is required"),
    organization: Yup.string().required("Organization Name is required"),
    orgUrl: Yup.string()
      .url("Invalid URL format")
      .required("Organization URL is required"),
    jobTitle: Yup.string().required("Job Title is required"),
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

  const Remove = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      className="w-[20px] h-[20px]"
    >
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
    </svg>
  );

  interface FormValues {
    color: string;
    organization: string;
    orgUrl: string;
    jobTitle: string;
    emails: string[];
    phoneNumbers: string[];
    urls: string[];
  }

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const uniqueFilter = (items: any[]) => {
    const seen = new Set();
    return items.filter((e: any) => {
      if (e?.type && e?.value && !seen.has(e.value)) {
        seen.add(e.value);
        return true;
      }
      return false;
    });
  };

  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const filteredEmails = uniqueFilter(values.emails);
    const filteredPhones = uniqueFilter(values.phoneNumbers);
    const filteredUrls = uniqueFilter(values.urls);

    const data = {
      passType: state.user.passType,
      backgroundColor: values.color,
      organizationName: values.organization,
      organizationURL: values.orgUrl,
      jobTitle: values.jobTitle,
      ...(filteredEmails.length && { emails: filteredEmails }),
      ...(filteredPhones.length && { phones: filteredPhones }),
      ...(filteredUrls.length && { urls: filteredUrls }),
    };

    try {
      setLoading(true);
      const authToken = state.auth.accessToken;
      const role: string = enums.ROLES[1];

      const { response, error }: ApiResponse = await Api(
        "/" + role + authRoutes.setupAccount,
        "post",
        {
          payload: data,
        },
        authToken
      );

      setLoading(false);

      if (response) {
        const design = response?.data;

        dispatch(
          saveAccount({
            _id: state.account._id,
            creator: state.user._id,
            type: enums.ACCOUNT_TYPE.PERSONAL,
            organizationName: values.organization,
            organizationURL: values.orgUrl,
          })
        );

        dispatch(
          saveDesign({
            _id: design?._id,
            name: design?.name,
            backgroundColor: design?.backgroundColor,
          })
        );

        dispatch(
          saveUser({
            jobTitle: values.jobTitle,
            steps: 3,
            ...(filteredEmails.length && {
              emails: filteredEmails.map((e: any) => ({
                type: e?.type,
                value: e?.value,
              })),
            }),
            ...(filteredPhones.length && {
              phones: filteredPhones.map((e: any) => ({
                type: e?.type,
                value: e?.value,
              })),
            }),
            ...(filteredUrls.length && {
              URLs: filteredUrls.map((e: any) => ({
                type: e?.type,
                value: e?.value,
              })),
            }),
          })
        );

        SuccessToastMessage({ message: response?.message });
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Customize your doorway
      </div>

      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-[70%]">
        Add the information you want your Doorway to share.
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          handleSubmit({ values });
          // resetForm();
        }}
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form>
            <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
              <div className={`width:330px`}>
                <div className="block">
                  <PassPreview
                    values={{
                      backgroundColor: values.color,
                      jobTitle: values.jobTitle,
                    }}
                  />
                </div>
              </div>
              <div className="w-[330px] flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[25px]">
                  <div className="text-navyBlue leading-regular flex cursor-default items-center gap-[5px] text-[15px] md:text-[13px]">
                    <div className="flex items-center gap-[5px] font-[500]">
                      <div className="flex items-center">
                        Device Type<span>*</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-between">
                    <label
                      className={`border py-[15px] text-legacy-regular rounded-regular flex-1 flex justify-center cursor-pointer ${
                        state.user.passType === enums.PASS_VIEW.APPLE
                          ? "border-themeColor text-themeColor"
                          : "border-gray-200 text-gray-400"
                      }`}
                      htmlFor="apple"
                    >
                      Apple
                      <input
                        className="hidden"
                        id="apple"
                        name="deviceType"
                        type="radio"
                        value="apple"
                        checked={state.user.passType === enums.PASS_VIEW.APPLE}
                        onClick={() => {
                          dispatch(
                            saveUser({
                              passType: enums.PASS_VIEW.APPLE,
                            })
                          );
                        }}
                      />
                    </label>
                    <label
                      className={`border py-[15px] text-legacy-regular rounded-regular flex-1 flex justify-center cursor-pointer ${
                        state.user.passType === enums.PASS_VIEW.ANDROID
                          ? "border-themeColor text-themeColor"
                          : "border-gray-200 text-gray-400"
                      }`}
                      htmlFor="android"
                    >
                      Android
                      <input
                        className="hidden"
                        id="android"
                        name="deviceType"
                        type="radio"
                        value="android"
                        checked={
                          state.user.passType === enums.PASS_VIEW.ANDROID
                        }
                        onClick={() => {
                          dispatch(
                            saveUser({
                              passType: enums.PASS_VIEW.ANDROID,
                            })
                          );
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <label className="text-[#304861] text-[15px] font-[500]">
                    Color*
                  </label>
                  <div
                    className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] flex items-center"
                    onClick={() => document.getElementById("color")!.click()}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <span
                          className="w-[18px] h-[18px] inline-block mr-[8px] rounded-sm"
                          style={{ background: values.color }}
                        ></span>
                        {values.color}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        className="w-[14px] h-[14px] text-[#BEBEBE]"
                      >
                        <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a3 3 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1 1 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4 4 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067S8.857 3.052 8.23 2.704c-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.3 3.3 0 0 1-.131-.673q.137.09.337.274m.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088q.081.181.183.365c.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626q.183.103.365.183l-4.861 4.862-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46s-1.168-1.32-1.46-1.846c-.147-.265-.225-.47-.251-.607l-.01-.068zm2.87-1.935a2.4 2.4 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.5 3.5 0 0 0-1.066.091 11 11 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"></path>
                      </svg>
                    </div>
                  </div>
                  <Field
                    id="color"
                    type="color"
                    name="color"
                    placeholder="Color"
                    style={{
                      position: "absolute",
                      opacity: 0,
                      pointerEvents: "none",
                    }}
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    Organization Name*
                  </div>
                  <Field
                    type="text"
                    name="organization"
                    className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                    placeholder="Organization Name"
                  />
                  <ErrorMessage
                    name="organization"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    Organization URL*
                  </div>
                  <Field
                    type="url"
                    name="orgUrl"
                    className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                    placeholder="Organization URL"
                  />
                  <ErrorMessage
                    name="orgUrl"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    Job Title*
                  </div>
                  <Field
                    type="text"
                    name="jobTitle"
                    className="bg-[#F2F5F5] focus rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                    placeholder="Job Title"
                  />
                  <ErrorMessage
                    name="jobTitle"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    Phone Numbers
                  </div>
                  <FieldArray name="phoneNumbers">
                    {({ push, remove, form }) => {
                      return (
                        <>
                          {form.values.phoneNumbers.map(
                            (_: any, index: any) => (
                              <div key={index} className="flex flex-col">
                                <div className="relative flex gap-[10px]">
                                  <Field
                                    type="tel"
                                    name={`phoneNumbers[${index}].value`}
                                    className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                                    placeholder="Phone Number"
                                  />

                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => remove(index)}
                                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                      <Remove />
                                    </button>
                                  )}
                                </div>
                                <ErrorMessage
                                  name={`phoneNumbers[${index}].value`}
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            onClick={() => push({ type: "work", value: "" })}
                            className="text-black font-semibold mt-2 text-left"
                          >
                            + Add Phone Number
                          </button>
                        </>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    Email
                  </div>
                  <FieldArray name="emails">
                    {({ push, remove, form }) => {
                      return (
                        <>
                          {form.values.emails.map((_: any, index: any) => (
                            <div key={index} className="flex flex-col">
                              <div className="relative flex gap-[10px]">
                                <Field
                                  type="email"
                                  name={`emails[${index}].value`}
                                  className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                                  placeholder="Email"
                                />

                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                  >
                                    <Remove />
                                  </button>
                                )}
                              </div>
                              <ErrorMessage
                                name={`emails[${index}].value`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ type: "work", value: "" })}
                            className="text-black font-semibold mt-2 text-left"
                          >
                            + Add Email
                          </button>
                        </>
                      );
                    }}
                  </FieldArray>
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <div className="text-[#304861] text-[15px] md:text-[13px] font-[500]">
                    URLs
                  </div>
                  <FieldArray name="urls">
                    {({ push, remove, form }) => {
                      return (
                        <>
                          {form.values.urls.map((_: any, index: any) => (
                            <div key={index} className="flex flex-col">
                              <div className="relative flex gap-[10px]">
                                <Field
                                  type="url"
                                  name={`urls[${index}].value`}
                                  className="bg-[#F2F5F5] rounded-[5px] min-h-[45px] px-[11px] text-[16px] placeholder-gray-300 outline-none w-full"
                                  placeholder="URL"
                                />

                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                  >
                                    <Remove />
                                  </button>
                                )}
                              </div>
                              <ErrorMessage
                                name={`urls[${index}].value`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => push({ type: "work", value: "" })}
                            className="text-black font-semibold mt-2 text-left"
                          >
                            + Add URL
                          </button>
                        </>
                      );
                    }}
                  </FieldArray>
                </div>
                <Button loading={loading} disabled={!isValid || isSubmitting} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomizeYourDesign;
