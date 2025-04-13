import { authRoutes } from "@/assets/api";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import UserPass from "../UserPass";
import Button from "../button";
import { saveUser } from "@/redux/reducers/user";
import { saveAccount } from "@/redux/reducers/account";

const SetupDoorwayOrganization: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    jobTitle: "",
    organizationName: "",
    organizationURL: "",
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    organizationName: Yup.string().required("Organization Name is required"),
    organizationURL: Yup.string()
      .url("Invalid URL format")
      .required("Organization URL is required"),
  });

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  interface FormValues {
    jobTitle: string;
    organizationName: string;
    organizationURL: string;
  }

  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const { jobTitle, organizationName, organizationURL } = values;

    try {
      setLoading(true);

      const authToken = state.auth.accessToken;
      const role: string = enums.ROLES[2];

      const { response, error }: ApiResponse = await Api(
        "/" + role + authRoutes.setupAccount,
        "post",
        {
          payload: {
            jobTitle: jobTitle,
            organizationName: organizationName,
            organizationURL: organizationURL,
          },
        },
        authToken
      );

      setLoading(false);

      if (response) {
        dispatch(
          saveUser({
            steps: state.user.steps + 1,
            jobTitle: jobTitle,
            urls: [{ type: "work", value: organizationURL }],
          })
        );
        dispatch(
          saveAccount({
            organizationName: organizationName,
            organizationURL: [{ type: "work", value: organizationURL }],
          })
        );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: any, { resetForm }) => {
          handleSubmit({ values });
          resetForm();
        }}
      >
        {({ isSubmitting, isValid, values, setFieldValue }) => (
          <Form>
            <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
              Set up your Doorway
            </div>
            <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full">
              Edit your job title to start personalising your Doorway, confirm
              your URL is correct, and click next to see a sample design.
            </div>
            <div className="flex flex-col min-md:flex-row gap-[44px] min-md:gap-[75px] items-center min-md:items-start justify-center p-5">
              <div className={`width:330px`}>
                <div className="block">
                  <UserPass values={values} />
                </div>
              </div>
              <div className="w-[330px] flex flex-col gap-[42px]">
                <div className="grow flex flex-col gap-[7px]">
                  <label className="text-[#304861] text-[15px] font-[500]">
                    Job Title*
                  </label>
                  <Field
                    type="text"
                    name="jobTitle"
                    placeholder="Enter Job Title"
                    className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px]"
                  />
                  <ErrorMessage
                    name="jobTitle"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="grow flex flex-col gap-[7px]">
                  <label className="text-[#304861] text-[15px] font-[500]">
                    Organization Name*
                  </label>
                  <Field
                    type="text"
                    name="organizationName"
                    placeholder="Enter Organization Name"
                    className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px]"
                  />
                  <ErrorMessage
                    name="organizationName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="grow flex flex-col gap-[7px]">
                  <label className="text-[#304861] text-[15px] font-[500]">
                    Organization URL*
                  </label>
                  <Field
                    type="text"
                    name="organizationURL"
                    placeholder="Enter Organization URL"
                    className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] px-[11px] focus:outline-none text-[16px]"
                  />
                  <ErrorMessage
                    name="organizationURL"
                    component="div"
                    className="text-red-500 text-sm"
                  />
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

export default SetupDoorwayOrganization;
