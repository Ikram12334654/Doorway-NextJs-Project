import { saveRegistration } from "@/redux/reducers/registration";
import { RootState } from "@/redux/store";
import { authRoutes } from "@/utils/routes";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import applelogo from "../../public/apple.png";
import googleLogo from "../../public/google.png";
import linkedInlogo from "../../public/linkedin.png";
import SocialLoginButton from "./socialLoginButton";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
import { browserPopupRedirectResolver } from "firebase/auth";

const RegisterPage: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const initialValues = {
    firstName: state.registration.firstName || "",
    lastName: state.registration.lastName || "",
    email: state.registration.email || "",
    password: "",
    referral: "",
    terms: false,
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    referral: Yup.string().required("This field is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the Terms & Privacy Policy"
    ),
  });

  interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referral: string;
    terms: boolean;
  }

  const generateStrongPassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0, n = charset.length; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  };

  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const { firstName, lastName, email, password, referral } = values;
    try {
      const { response, error } = await Api(authRoutes.register, "post", {
        payload: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          aboutUs: referral,
          accountType: state.registration.accountType,
        },
      });

      if (response) {
        SuccessToastMessage({ message: response?.message });

        dispatch(
          saveRegistration({
            steps: state.registration.steps + 1,
            firstName: firstName,
            lastName: lastName,
            email: email,
          })
        );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {}
  };

  const continueWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
      const token = await auth?.currentUser?.getIdToken();

      const { response, error } = await Api(
        authRoutes.registerWithGoogle,
        "post",
        {
          payload: {
            token: token,
            accountType: state.registration.accountType,
          },
        }
      );

      const { email, displayName } = auth?.currentUser;

      if (response) {
        SuccessToastMessage({ message: response?.message });

        dispatch(
          saveRegistration({
            steps: state.registration.steps + 1,
            firstName: displayName?.split(" ")[0] || "",
            lastName: displayName?.split(" ")[1] || "",
            email: email || "",
          })
        );
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (error) {}
  };
  {
    console.log("this is tool tip ", tooltipVisible);
  }
  return (
    <div className="flex flex-col items-center">
      <div className="md:block text-[25px] min-md:text-[50px] heading-[58px] font-[600] mb-[8px]  text-center max-w-[920px] mx-auto">
        Create a Login
      </div>
      <div className="min-md:block text-[16px] heading-[25px] min-md:mb-[38px] font-[400] text-center max-w-[287px] min-md:max-w-full">
        Create a log in to save your progress as you start setting up Doorway.
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit({ values });
          resetForm();
        }}
      >
        {({ isSubmitting, isValid, setFieldValue }) => (
          <Form className="flex flex-col gap-[17px] min-md:gap-[30px] mt-[30px]">
            <div className="flex gap-[17px] flex-col min-md:flex-row items-center min-md:items-start">
              <div className="w-[298px]">
                <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                  First Name
                </label>
                <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center">
                  <Field
                    type="text"
                    name="firstName"
                    className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black"
                    placeholder="Evelyn"
                  />
                </div>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[298px]">
                <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                  Last Name
                </label>
                <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center">
                  <Field
                    type="text"
                    name="lastName"
                    className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black"
                    placeholder="Waugh"
                  />
                </div>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex gap-[17px] flex-col min-md:flex-row items-center min-md:items-start">
              <div className="w-[298px]">
                <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                  Work Email
                </label>
                <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center">
                  <Field
                    type="email"
                    name="email"
                    className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black"
                    placeholder="evelyn.waugh@p&amp;p.com"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="w-[298px]">
                <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                  Password
                </label>
                <div
                  className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                >
                  <Field
                    type="password"
                    name="password"
                    className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black"
                    placeholder="Password"
                  />
                  {tooltipVisible && (
                    <div
                      className="absolute top-full mt-16 bg-black text-white p-2 rounded shadow-md text-sm cursor-pointer"
                      onClick={() =>
                        setFieldValue("password", generateStrongPassword())
                      }
                    >
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-black" />
                      Click to generate a strong password
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="w-[298px] min-md:w-full mx-auto">
              <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                How did you hear about us?
              </label>
              <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center ">
                <Field
                  type="text"
                  name="referral"
                  className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black "
                  placeholder="Referral"
                />
              </div>
              <ErrorMessage
                name="referral"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex justify-center">
              <label className="flex items-center text-mde text-slate-700">
                <Field
                  type="checkbox"
                  name="terms"
                  className="mr-2 text-electricGreen"
                />
                <span>
                  I accept Doorway’s{" "}
                  <a
                    href="https://www.doorway.io/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-electricGreen text-themeColor"
                  >
                    Terms of Use & Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div className="w-[280px] mx-auto">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`${
                  !isValid || isSubmitting ? "bg-gray-400" : "bg-themeColor"
                } text-white cursor-pointer text-[15px] font-[500] rounded-[5px] py-[12px] min-md:py-[14px] text-center w-[280px]`}
              >
                Next
              </button>
              <div className="w-full flex flex-col item-center .justify-center mt-5 sm:text-sm">
                <span className="flex justify-center">or</span>
                <SocialLoginButton
                  values={{
                    logo: googleLogo,
                    label: "Continue with Google",
                    onClick: () => {
                      continueWithGoogle();
                    },
                  }}
                />
                <SocialLoginButton
                  values={{
                    logo: applelogo,
                    label: "Continue with Apple",
                    onClick: () => {},
                  }}
                />
                <SocialLoginButton
                  values={{
                    logo: linkedInlogo,
                    label: "Continue with LinkedIn",
                    onClick: () => {},
                  }}
                />
                <div className="mt-5 " />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
