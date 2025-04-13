import React, { useState } from "react";
import { DoorwayImages } from "../assets/style";
import Image from "next/image";
import LoadingSpinner from "@/assets/LoadingSpinner";
import AuthNavbar from "../assets/authNavbar";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .min(8, "Password must be at least 8 characters long")
      .required("password is required"),
  });
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);

    setTimeout(() => {
      console.log("Password Updated:", values);
      setLoading(false);
      setSubmitting(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      {/* Fix the Navbar */}
      <div className="w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

      {/* Main Layout */}
      <div className="h-screen w-1/2 flex justify-center items-center md:hidden bg-themeColor">
        <Image
          src={DoorwayImages.logo}
          alt="logos"
          className="h-auto w-[330px] lg:w-[270px]"
        />
      </div>
      <div className="flex h-screen w-1/2 md:w-screen bg-white">
        <div
          className="mx-auto w-70p h-max p-10 items-center md:w-[90%] sm:w-[98%] sm:p-0 md:p-8 lg:p-2 justify-center 2xl:w-[50%] lg:w-[80%] md:w-[90%] sm:w-[98%] sm:p-4 flex flex-col"
          style={{ margin: "auto" }}
        >
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} // Using the typed handleSubmit function
          >
            {({ setFieldValue, isSubmitting, isValid }) => (
              <Form className="w-full">
                {
                  <div className="mb-2">
                    <div className="mb-3 mt-5 relative">
                      <label
                        htmlFor="newPassword"
                        className="block font-medium md:text-mde"
                      >
                        New Password
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("newPassword", e.target.value);
                          setIsDisabled(e.target.value === ""); // Disable the submit button if the field is empty
                        }}
                        className="w-full p-2 border rounded-[6px]  min-h-[40px]  md:max-h-[35px] focus:outline-none mb- focus pr-10" // Add padding-right to make space for the eye icon
                      />
                      <ErrorMessage
                        name="newPassword"
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
                }
                {
                  <div className="mb-2">
                    <div className="mb-3 mt-5 relative">
                      <label
                        htmlFor="confirmPassword"
                        className="block font-medium md:text-mde"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue("confirmPassword", e.target.value);
                          setIsDisabled(e.target.value === ""); // Disable the submit button if the field is empty
                        }}
                        className="w-full p-2 border rounded-[6px]  min-h-[40px]  md:max-h-[35px] focus:outline-none mb- focus pr-10" // Add padding-right to make space for the eye icon
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />

                      {/* Eye Button */}
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute pt-6 right-3 top-1/2 transform -translate-y-1/2 text-mde " // Center and make the button smaller
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                }
                {
                  <button
                    type="submit"
                    className={`w-full p-2 mt-2 text-center justify-center align-center text-white rounded-[6px] min-h-[40px] ${
                      !isValid || isSubmitting || isDisabled
                        ? "bg-gray-400"
                        : "bg-themeColor"
                    }`}
                    disabled={!isValid || isSubmitting || isDisabled}
                  >
                    {loading ? (
                      <LoadingSpinner size={25} color={"primary"} />
                    ) : (
                      "Create Password"
                    )}
                  </button>
                }
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
