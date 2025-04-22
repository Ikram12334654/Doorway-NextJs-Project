import OrganizationSetting from "@/component/organization/setting";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useSelector } from "react-redux";

function Settings() {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {/* {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && ( */}
        <OrganizationSetting />
      {/* )} */}
    </>
  );
}

export default Settings;
