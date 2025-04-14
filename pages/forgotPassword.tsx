import LoadingSpinner from "@/assets/LoadingSpinner";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useState } from "react";
import * as Yup from "yup";
import AuthNavbar from "../assets/authNavbar";
import { DoorwayImages } from "../assets/style";
import Button from "@/component/button";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  interface FormValues {
    email: string;
  }

  const handleSubmit = async ({ values }: { values: FormValues }) => {};

  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      <div className="w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { resetForm }) => {
              handleSubmit({ values });
              resetForm();
            }}
          >
            {({ isSubmitting, isValid, values, setFieldValue, dirty }) => (
              <Form className="w-full">
                {loading && (
                  <div className="flex item-center  justify-center flex-col mt-5 mb-5">
                    <div className="flex item-center justify-center">
                      <LoadingSpinner />
                    </div>
                    <span className="flex item-center justify-center">
                      Sending the mail...
                    </span>
                  </div>
                )}
                {!loading && (
                  <div className="mb-2">
                    <label
                      htmlFor="email"
                      className="block font-medium md:text-mde mb-1"
                    >
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="raoikram@gmail.com"
                      className="w-full p-2 border border-black rounded-[6px] max-h-[40px] focus:outline-none mb- focus"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("email", e.target.value);
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {!loading && (
                  <Button
                    title="Request Password reset"
                    loading={loading}
                    disabled={!dirty || !isValid || isSubmitting}
                  />
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
