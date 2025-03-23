import { RootState } from "@/redux/store";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import Registration from "../common/registration";
import EditDesignOrganization from "./EditDesign";
import SelectRequirements from "./SelectRequirements";
import SetupDoorwayOrganization from "./setupDoorway";

const steps = [
  {
    step: 1,
    label: "Create a Login",
    component: <Registration />,
  },
  {
    step: 2,
    label: "Your Doorway",
    component: <SetupDoorwayOrganization />,
  },
  {
    step: 3,
    label: "Edit Design",
    component: <EditDesignOrganization />,
  },
  {
    step: 4,
    label: "Select Requirements",
    component: <SelectRequirements />,
  },
];

function SignUpOrganization() {
  const state = useSelector((state: RootState) => state);
  const currentStep = state.user.steps;

  return (
    <div className="w-[75%] ml-auto mr-auto mt-10">
      <div className="hidden min-xl:flex justify-center">
        <div className="flex gap-[10px] items-center mb-[22px] xl:mb-[30px]">
          {steps.map((item, index) => (
            <div className="flex items-center" key={item.step}>
              <div
                className={`${
                  currentStep >= item.step ? "bg-themeColor" : "bg-[#BEBEBE]"
                } h-[17px] w-[17px] min-xl:h-[23px] min-xl:w-[23px] flex items-center justify-center rounded-full text-white text-[10px]`}
              >
                {item.step}
              </div>
              <div
                className={`${
                  currentStep >= item.step
                    ? "text-themeColor"
                    : "text-[#BEBEBE]"
                } text-[8px] min-xl:text-[18px] ml-1`}
              >
                {item.label}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`mx-[10px] ${
                    currentStep > item.step
                      ? "text-themeColor"
                      : "text-[#BEBEBE]"
                  } text-[13px] min-xl:text-[18px] font-bold`}
                >
                  <ArrowForwardIcon fontSize="inherit" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[80%] h-max flex flex-col items-center justify-center m-auto">
        {steps.find((s) => s.step === currentStep)?.component}
      </div>
    </div>
  );
}

export default SignUpOrganization;
