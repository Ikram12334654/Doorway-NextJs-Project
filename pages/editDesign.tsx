import EditDesignTemplateOrganization from "@/component/organization/editDesignTemplate";
import { RootState } from "@/redux/store";
import enums from "@/utils/enums";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

interface EditDesignProps {
  values: object;
}

const EditDesign: React.FC<EditDesignProps> = () => {
  const router = useRouter();
  const state = useSelector((state: RootState) => state);
  const { _id, templateName, color, logoUrl, stripUrl, checkBox } =
    router.query;

  return (
    <>
      {state.account.type === enums.ACCOUNT_TYPE.ORGANIZATION && (
        <EditDesignTemplateOrganization
          _id={_id}
          templateName={templateName}
          color={color}
          checkBox={checkBox}
          logoUrl={logoUrl}
          stripUrl={stripUrl}
        />
      )}
    </>
  );
};

export default EditDesign;
