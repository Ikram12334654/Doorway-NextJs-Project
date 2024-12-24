import React, { useState } from 'react';
import { DoorwayImages } from '../assets/style';
import Image from 'next/image';
import LoadingSpinner from '@/assets/LoadingSpinner';
import AuthNavbar from "../assets/authNavbar";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Define form values type
interface FormValues {
  email: string;
}

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
  });

  // Handle form submission
  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    setLoading(true);

    setTimeout(() => {
      console.log('Email Submitted:', values.email);
      setLoading(false);
      setSubmitting(false); // Stop submitting state after form submission
    }, 2000); // Simulating a 2-second delay
  };

  return (
    <div className="w-screen h-screen flex flex-row md:flex-col">
      {/* Fix the Navbar */}
      <div className="w-full z-10 hidden md:flex fixed mt-3">
        <AuthNavbar />
      </div>

      {/* Main Layout */}
      <div className="h-screen w-1/2 flex justify-center items-center md:hidden bg-themeColor">
        <Image src={DoorwayImages.logo} alt="logos" className="h-auto w-[330px] lg:w-[270px]" />
      </div>
      <div className="flex h-screen w-1/2 md:w-screen bg-white">
        <div className="mx-auto w-70p h-max p-10 items-center md:w-[90%] sm:w-[98%] sm:p-0 md:p-8 lg:p-2 justify-center 2xl:w-[50%] lg:w-[80%] md:w-[90%] sm:w-[98%] sm:p-4 flex flex-col" style={{ margin: 'auto' }}>
          <Formik
            initialValues={{
              email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit} // Using the typed handleSubmit function
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full">
                {loading && (
                  <div className="flex item-center  justify-center flex-col mt-5 mb-5">
                   <div className='flex item-center justify-center'> <LoadingSpinner /></div> 
                   <span className='flex item-center justify-center' >Sending the mail...</span> 
                  </div>
                )}
                {!loading && (
                  <div className="mb-2">
                    <label htmlFor="email" className="block font-medium md:text-mde mb-1">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="raoikram@gmail.com"
                      className="w-full p-2 border border-black rounded-[6px] max-h-[40px] focus:outline-none mb- focus"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('email', e.target.value);
                        setIsDisabled(e.target.value === ""); // Disable the submit button if the field is empty
                      }}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                )}

                {!loading && (
                  <button
                    type="submit"
                    className={`w-full p-2 mt-2 text-center align-center text-white rounded-[6px] min-h-[40px] ${isDisabled || isSubmitting ? 'bg-gray-400' : 'bg-themeColor'}`}
                    disabled={isDisabled || isSubmitting} // Disable submit button if form is submitting
                  >
                    Request Password reset
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
