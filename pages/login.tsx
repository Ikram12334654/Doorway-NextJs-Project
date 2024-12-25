import LoadingSpinner from "@/assets/LoadingSpinner";
import { setAuthToken } from "@/redux/reducers/auth";
import Api from "@/utils/service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AuthNavbar from "../assets/authNavbar";
import { DoorwayImages } from "../assets/style";
import applelogo from "../public/apple.png";
import googleLogo from "../public/google.png";
import linkedInlogo from "../public/linkedin.png";
import { authRoutes } from "../utils/routes";
import { ErrorToastMessage, SuccessToastMessage } from "../utils/toast";
function Login() {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Email must be valid"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleNext = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowPasswordField(true);
    }, 1000);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  interface FormValues {
    email: string;
    password: string;
  }

  const dispatch = useDispatch();

  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const { email, password } = values;

    try {
      setLoading(true);

      const { response, error } = await Api(authRoutes.login, "post", {
        payload: {
          email,
          password,
        },
      });

      setLoading(false);

      if (response) {
        SuccessToastMessage({ message: response.message });
        dispatch(setAuthToken({ token: response.token }));
      } else if (error) {
        ErrorToastMessage({ message: error.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      {/* Fix the Navbar */}
      <div className=" w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

      {/* Main Layout */}
      <div className="h-screen w-1/2  flex justify-center items-center  md:hidden bg-themeColor">
        <Image
          src={DoorwayImages.logo}
          alt="logos"
          className="h-auto w-[330px] lg:w-[270px]"
        />
      </div>
      <div className="flex h-screen w-1/2 md:w-screen bg-white">
        <div
          className="mx-auto w-70p h-max p-10 items-center md:w-[90%] sm:w-[98%] sm:p-0 md:p-8 lg:p-2 justify-center 2xl:w-[60%]  lg:w-[80%]  md:w-[90%] sm:w-[98%] sm:p-4  flex flex-col  "
          style={{ margin: "auto" }}
        >
          <h1 className="text-lg font-700 w-[100%] mb-6 md:text-md ">Login</h1>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit({ values });
              resetForm();
            }}
          >
            {({ setFieldValue }) => (
              <Form className="w-full">
                {loading && (
                  <div className=" flex item-center aling-center justify-center mt-5 mb-5">
                    <LoadingSpinner />
                  </div>
                )}
                {!showPasswordField && !loading && (
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="block font-medium  md:text-mde"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      className="w-full p-2 border rounded-[6px]  min-h-[40px]  md:max-h-[35px] focus:outline-none mb- focus"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("email", e.target.value);
                        setIsDisabled(false);
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <div className="flex flex-row justify-between aling-center color-themeColor mt-3  mb-3 text-sm text-themeColor">
                      <Link href="/forgetPassword">forget Password ?</Link>
                      <Link href="/register">Sign Up</Link>
                    </div>
                  </div>
                )}
                {showPasswordField && !loading && (
                  <div>
                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block font-medium md:text-mde "
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        className="w-full p-2 border rounded-[6px]  min-h-[40px]  md:max-h-[35px] focus:outline-none mb- focus"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setShowPasswordField(false);
                          setFieldValue("email", e.target.value);
                        }}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      <div className="mb-3 mt-5 relative">
                        <label
                          htmlFor="password"
                          className="block font-medium md:text-mde"
                        >
                          Password
                        </label>
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="w-full p-2 border rounded-[6px]  min-h-[40px]  md:max-h-[35px] focus:outline-none mb- focus pr-10" // Add padding-right to make space for the eye icon
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-sm"
                        />

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute pt-6 right-3 top-1/2 transform -translate-y-1/2 text-mde " // Center and make the button smaller
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-left aling-center color-themeColor mt-3  mb-4 text-sm text-themeColor">
                      <Link href="/forgetPassword">forget Password ?</Link>
                    </div>
                    <button
                      type="submit"
                      className={`w-full mt-3 p-2 text-center text-white rounded-[6px]  min-h-[40px] bg-themeColor  md:min-h-[36px]`}
                    >
                      Submit
                    </button>
                  </div>
                )}
                {!showPasswordField && !loading && (
                  <button
                    className={`w-full p-2 text-center aling-center text-white rounded-[6px]  min-h-[40px] sm:min-h-[30px] md:min-h-[36px]
                    ${isDisabled ? "bg-gray-400" : "bg-themeColor"}`}
                    disabled={isDisabled}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
                {!showPasswordField && (
                  <div className="w-full flex flex-col item-center .justify-center mt-5 sm:text-sm">
                    <span className="flex justify-center">or</span>
                    <button
                      onClick={() => {}}
                      className="w-full p-2  mt-5 border border-black hover:bg-[#F5F5F5FF] flex flex-row items-center "
                    >
                      <Image
                        src={googleLogo}
                        alt="google logo"
                        className="h-[15px] w-auto mr-3 ml-10 sm:ml-1 sm:h-[11px] lg:ml-2 "
                      />
                      <span>Login with Google</span>
                    </button>
                    <button className="w-full p-2  mt-5 border border-black hover:bg-[#F5F5F5FF] flex flex-row items-center ">
                      <Image
                        src={applelogo}
                        alt="google logo"
                        className="h-[15px] w-auto mr-3  ml-10 sm:ml-1 sm:h-[11px] lg:ml-2"
                      />
                      <span>Login with Apple</span>
                    </button>
                    <button className="w-full p-2  mt-5 border border-black hover:bg-[#F5F5F5FF] flex flex-row items-center ">
                      <Image
                        src={linkedInlogo}
                        alt="google logo"
                        className="h-[15px] w-auto mr-3  ml-10 sm:ml-1 sm:h-[11px] lg:ml-2"
                      />
                      <span>Login with linkedIn</span>
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Login;
