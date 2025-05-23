import LoadingSpinner from "@/assets/LoadingSpinner";
import { clearAccount, saveAccount } from "@/redux/reducers/account";
import { saveAuth } from "@/redux/reducers/auth";
import { saveDesign } from "@/redux/reducers/design";
import { clearUser, saveUser } from "@/redux/reducers/user";
import Api from "@/utils/service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { authRoutes } from "../assets/api";
import AuthNavbar from "../assets/authNavbar";
import { DoorwayImages } from "../assets/style";
import SocialLoginButton from "../component/socialLoginButton";
import applelogo from "../public/apple.png";
import googleLogo from "../public/google.png";
import linkedInlogo from "../public/linkedin.png";
import env from "../utils/config";
import { ErrorToastMessage, SuccessToastMessage } from "../utils/toast";
import { savePermission } from "@/redux/reducers/permission";

function Login() {
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [socialLoginState, setSocialLoginState] = useState({
    google: false,
    apple: false,
    linkedIn: false,
  });

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

  useEffect(() => {
    dispatch(clearUser());
    dispatch(clearAccount());
  }, []);

  interface FormValues {
    email: string;
    password: string;
  }

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const handleRoute = ({ response }: any) => {
    setLoading(false);
    SuccessToastMessage({ message: response?.message });
    router.push("/signUp");
  };

  const loginWithGoogle = async () => {
    setSocialLoginState((prevState) => ({
      google: true,
      apple: false,
      linkedIn: false,
    }));
    const url = env.API_URL + authRoutes.loginWithGoogle;
    window.location.href = url;
  };

  const handleSubmit = async ({ values }: { values: FormValues }) => {
    const { email, password } = values;

    try {
      setLoading(true);

      const { response, error }: ApiResponse = await Api(
        authRoutes.login,
        "post",
        {
          payload: {
            email,
            password,
          },
        }
      );

      if (response) {
        response?.data?.user && dispatch(saveUser(response?.data?.user));
        response?.data?.account &&
          dispatch(saveAccount(response?.data?.account));
        response?.data?.design && dispatch(saveDesign(response?.data?.design));
        dispatch(
          saveAuth({
            accessToken: response?.accessToken,
            refreshToken: response?.refreshToken,
          })
        );

        handleRoute({ response });
      } else if (error) {
        setLoading(false);
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      <div className=" w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

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
            {({ setFieldValue, dirty }) => (
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
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <div className="flex flex-row justify-between aling-center color-themeColor mt-3  mb-3 text-sm text-themeColor">
                      <Link href="/forgotPassword">Forgot password ?</Link>
                      <Link href="/signUp">Sign Up</Link>
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

                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute pt-6 right-3 top-1/2 transform -translate-y-1/2 text-mde"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-row justify-left aling-center color-themeColor mt-3  mb-4 text-sm text-themeColor">
                      <Link href="/forgotPassword">Forgot password ?</Link>
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
                    ${!dirty ? "bg-gray-400" : "bg-themeColor"}`}
                    disabled={!dirty}
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </Form>
            )}
          </Formik>
          {!showPasswordField && (
            <div className="w-full flex flex-col item-center .justify-center mt-5 sm:text-sm">
              <span className="flex justify-center">or</span>

              <SocialLoginButton
                loading={socialLoginState.google}
                values={{
                  logo: googleLogo,
                  label: "Login with Google",
                  onClick: () => {
                    loginWithGoogle();
                  },
                }}
              />
              <SocialLoginButton
                loading={socialLoginState.apple}
                values={{
                  logo: applelogo,
                  label: "Login with Apple",
                  onClick: () => {},
                }}
              />

              <SocialLoginButton
                loading={socialLoginState.linkedIn}
                values={{
                  logo: linkedInlogo,
                  label: "Login with LinkedIn",
                  onClick: () => {},
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
