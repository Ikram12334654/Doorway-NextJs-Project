import NewDesignTemplateOrganization from "@/component/organization/newDesignTemplate";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import React from "react";
import { useSelector } from "react-redux";

const NewDesign: React.FC = () => {
  const state = useSelector((state: RootState) => state);

  return (
    <>
      {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
        <NewDesignTemplateOrganization />
      )}
    </>
  );
};

export default NewDesign;
