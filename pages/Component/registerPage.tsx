import { saveAuthToken } from "@/redux/reducers/auth";
import { saveCurrentUser } from "@/redux/reducers/user";
import { RootState } from "@/redux/store";
import { authRoutes } from "@/utils/routes";
import { decryptJSON } from "@/utils/security";
import Api from "@/utils/service";
import { ErrorToastMessage } from "@/utils/toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Button from "./button";

const RegisterPage: React.FC = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const initialValues = {
    firstName: state.user.firstName || "",
    lastName: state.user.lastName || "",
    email: state.user.emails[0] || "",
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
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character (@, $, !, %, *, ?, &)")
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
    const length = 12; // Desired password length
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  
    // Ensure the password contains at least one of each required character type
    let password =
      lowercase.charAt(Math.floor(Math.random() * lowercase.length)) +
      uppercase.charAt(Math.floor(Math.random() * uppercase.length)) +
      numbers.charAt(Math.floor(Math.random() * numbers.length)) +
      specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
    // Combine all character pools
    const allChars = lowercase + uppercase + numbers + specialChars;
  
    // Fill the remaining characters up to the desired length
    for (let i = password.length; i < length; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
  
    // Shuffle the password to randomize character order
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  
    return password;
  };
  
  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const { firstName, lastName, email, password, referral } = values;
    try {
      setLoading(true);

      const { response, error } = await Api(authRoutes.register, "post", {
        payload: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          aboutUs: referral,
          accountType: state.user.accountType,
        },
      });

      setLoading(false);

      if (response) {
        const decryptedJSON = await decryptJSON(response?.data);
        const user = decryptedJSON?.user;
        dispatch(saveCurrentUser({ ...user, emails: [user.email] }));
        dispatch(saveAuthToken({ token: response?.accessToken }));
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
        {({ isSubmitting, isValid , values, setFieldValue }) => (
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
              <div className="w-[298px] relative">
                <label className="text-[#304861] text-[15px] min-md:text-[13px] font-[500] heading-[20px]">
                  Password
                </label>
                <div className="bg-[#F2F5F5] rounded-[5px] min-h-[55px] min-md:min-h-[40px] px-[11px] flex items-center"
                  onFocus={() => setTooltipVisible(true)} // Show tooltip on focus
                  onBlur={() => setTooltipVisible(false)} // Hide tooltip on blur
                  onMouseEnter={()=>setTooltipVisible(true)}>
                  <Field
                    type="password"
                    name="password"
                    className="w-full h-full focus:outline-none bg-transparent text-[16px] min-md:text-[14px] text-black"
                    placeholder="Password"
                  />
                </div>
                {values.password === "" && tooltipVisible && (
    <div
    className="absolute top-full left-0 cursor-pointer -mt-1 bg-black text-white p-2 rounded shadow-md text-sm w-full z-10"
    onClick={() => {
      setFieldValue("password", generateStrongPassword());
      setTooltipVisible(false); // Close tooltip after generating password
    }}
  >
    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-black" />
   <div className="text-sm p-1"> Click to generate a strong password</div>
  </div>
              )}
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
              <Button loading={loading} disabled={!isValid || isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
