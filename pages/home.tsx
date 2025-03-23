import OrganizationHome from "@/component/organization/home";
import PersonalHome from "@/component/personal/home";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useSelector } from "react-redux";

function Home() {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {
        (state.account.type === enums.ACCOUNT_TYPE.PERSONAL && <PersonalHome />,
        state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
          <OrganizationHome />
        ))
      }
    </>
  );
}
export default Home;
