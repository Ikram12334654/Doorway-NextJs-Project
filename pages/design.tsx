import OrganizationDesign from "@/component/organization/design";
import PersonalDesign from "@/component/personal/design";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useSelector } from "react-redux";

function Design() {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {state.account.type === enums.ACCOUNT_TYPE.PERSONAL && <PersonalDesign />}
      {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
        <OrganizationDesign />
      )}
    </>
  );
}

export default Design;
