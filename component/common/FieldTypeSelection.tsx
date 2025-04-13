import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
  index: number;
  type?: string;
  onChanged: (newType: string) => void;
  onRemove: (index: number) => void;
}

const FieldTypeSelection: React.FC<Props> = ({
  type,
  index,
  onChanged,
  onRemove,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleUpdate = ({ option }: any) => {
    onChanged(option);
    setDropDown(false);
    setShowCustomInput(false);
  };

  const initialValues = {
    fieldType: "",
  };

  const validationSchema = Yup.object({
    fieldType: Yup.string()
      .required("Type is required")
      .matches(/^[A-Za-z]+$/, "Only alphabets are allowed"),
    firstName: Yup.string(),
  });

  return (
    <div className="flex flex-col gap-[12px] items-start">
      <div className="w-full flex flex-col gap-[4px]">
        <div className="flex items-center">
          <div className="flex-grow relative">
            <div className="flex items-center cursor-pointer hover:text-brand">
              <div className="relative">
                <div
                  className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full gap-[8px]"
                  onClick={() => {
                    setDropDown(!dropDown);
                  }}
                >
                  <div className="flex items-center flex-grow gap-[8px]">
                    <div className="flex flex-col gap-[4px]">
                      <span
                        className={`font-medium whitespace-nowrap ${
                          type ? "text-petite" : "text-gray-400"
                        }`}
                      >
                        {type || "Select Type"}
                      </span>
                    </div>
                  </div>
                  {type ? (
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="remixicon text-brand-500 w-[20px]"
                    >
                      <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#DBDBDBFF"
                      className="remixicon w-[16px] h-[16px]"
                    >
                      <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                    </svg>
                  )}
                </div>
                {dropDown && (
                  <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                    <div className="p-[8px] flex flex-col gap-[8px]">
                      {["work", "home", "custom"].map((option) => (
                        <div
                          key={option}
                          className="cursor-pointer rounded-[6px] hover:bg-brand-50 px-[12px] py-[10px] flex items-center w-full gap-[8px]"
                          onClick={() => {
                            if (option === "custom") {
                              setDropDown(false);
                              setShowCustomInput(true);
                            } else {
                              handleUpdate({ option: option });
                            }
                          }}
                        >
                          <span className="text-petite font-medium whitespace-nowrap">
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {showCustomInput && (
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values: any, { resetForm }) => {
                      resetForm();
                    }}
                  >
                    {({ isSubmitting, isValid, values, setFieldValue }) => (
                      <Form>
                        <div className="absolute top-[25px] min-w-[170px] bg-white border border-gray-100 rounded-[8px] overflow-hidden z-10 shadow-regular">
                          <div className="p-[8px] flex flex-col gap-[8px]">
                            <Field
                              type="text"
                              name="fieldType"
                              className="border-[1.5px] focus:outline-none rounded-[6px] overflow-hidden text-gray-950 border-gray-100 focus-within:border-themeColor bg-white w-full px-[12px] py-[9px] caret-brand placeholder-gray-300"
                              placeholder="Enter Prefix"
                            />
                            <ErrorMessage
                              name="fieldType"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                            <div className="flex gap-[10px]">
                              <div
                                className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[11px] py-[5px] border-[1px] text-gray-700 border-gray-100 bg-white hover:bg-gray-50 focus:border-[2px] focus:border-gray-100 cursor-pointer"
                                onClick={() => {
                                  setShowCustomInput(false);
                                }}
                              >
                                Cancel
                              </div>
                              <div
                                className="inline-flex rounded-[6px] text-petite font-semibold justify-center gap-[6px] transition-all duration-500 ease-in-out w-full px-[12px] py-[6px] text-white bg-brand-500 hover:bg-brand-400 focus:border-brand-200 cursor-pointer"
                                onClick={() => {
                                  if (isValid) {
                                    handleUpdate({
                                      option: values.fieldType,
                                    });
                                  }
                                }}
                              >
                                Save
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
          <svg
            onClick={() => onRemove(index)}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="remixicon w-[20px] h-[20px] text-gray-400 cursor-pointer hover:text-danger"
          >
            <path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FieldTypeSelection;
