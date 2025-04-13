import { authRoutes } from "@/assets/api";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import Api from "@/utils/service";
import { ErrorToastMessage, SuccessToastMessage } from "@/utils/toast";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../button";
import { saveAccount } from "@/redux/reducers/account";

interface CloseModelProps {
  onClose: () => void;
}

const DoorwayPanel: React.FC<CloseModelProps> = ({ onClose }) => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const initialValues = {
    maxDoorways: state.account.maxDoorway || 1,
  };

  const handleCancel = () => {
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  interface ApiResponse<T = any> {
    data?: T;
    [key: string]: any;
  }

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const authToken = state.auth.accessToken;

      const { response, error }: ApiResponse = await Api(
        "/" +
          enums.ROLES[state.user.role as keyof typeof enums.ROLES] +
          authRoutes.updateMultipleDoorways,
        "put",
        {
          payload: {
            maxDoorway: values.maxDoorways,
          },
        },
        authToken
      );

      setLoading(false);
      onClose();

      if (response) {
        dispatch(saveAccount({ maxDoorway: values.maxDoorways }));
        SuccessToastMessage({ message: response?.message });
      } else if (error) {
        ErrorToastMessage({ message: error?.message });
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-0 bottom-0 inset-0 border bg-[#23272E33] z-[2000]"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 h-full">
        <div
          className="absolute right-0 top-0 w-full max-w-[450px] bg-white shadow-xl h-full"
          ref={modalRef}
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue, dirty }) => {
              return (
                <Form>
                  <div className="relative w-screen h-screen max-w-md">
                    <div className="h-full flex flex-col pb-6 pt-3 bg-white shadow-xl">
                      <div className="relative flex-1 px-4 sm:px-6">
                        <div className="flex items-center justify-between pb-4 pt-2">
                          <h3 className="font-heading text-xl min-md:text-2xl mb-4">
                            Multiple Doorways
                          </h3>
                          <button
                            className="appearance-none outline-none"
                            onClick={handleCancel}
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              width="1em"
                              height="1em"
                              fill="currentColor"
                            >
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="my-4">
                          <div className="text-navyBlue text-[15px] font-[500] mb-[10px]">
                            Max Doorways per User
                          </div>
                          <div className="relative">
                            <div
                              className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-lg text-gray-900 cursor-pointer"
                              onClick={() => setModel(!model)}
                            >
                              <span>{values.maxDoorways}</span>
                              <ArrowDropDownIcon className="text-gray-600" />
                            </div>
                            {model && (
                              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <ul className="list-none p-0 m-0">
                                  {enums.MAXDOORWAYS.map((e) => (
                                    <li
                                      key={e}
                                      className="py-2 px-3 text-gray-900 cursor-pointer hover:bg-brand-300 hover:text-white hover:font-semibold"
                                      onClick={() => {
                                        setFieldValue("maxDoorways", e);
                                        setModel(false);
                                      }}
                                    >
                                      {e}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button
                            title="Update"
                            disabled={loading || !dirty}
                            loading={loading}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DoorwayPanel;
