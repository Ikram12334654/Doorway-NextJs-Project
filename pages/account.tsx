import OrganizationAccount from "@/component/organization/account";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useSelector } from "react-redux";

function Account() {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {
        (state.account.type === enums.ACCOUNT_TYPE.PERSONAL && (
          <OrganizationAccount />
        ),
        state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
          <OrganizationAccount />
        ))
      }
    </>
  );
}
export default Account;
