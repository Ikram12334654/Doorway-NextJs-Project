interface VFCProps {
  data?: any;
}

interface EProps {
  type?: string;
  value?: string;
}

export const vcfText = ({ data }: VFCProps): string => {
  const getName = (): string => {
    const nameParts = [data?.firstName, data?.lastName].filter(Boolean);
    return nameParts.join(" ").trim();
  };

  const getFullName = (): string => {
    const nameParts = [
      data?.prefix,
      data?.firstName,
      data?.lastName,
      data?.suffix,
    ].filter(Boolean);
    return nameParts.join(" ").trim();
  };

  const formatPhones = (): string => {
    return data?.phones
      .map((e: EProps) => `TEL;TYPE=${e?.type}:${e?.value}`)
      .join("\n");
  };

  const formatEmails = (): string => {
    return data?.emails
      .map((e: EProps) => `EMAIL;TYPE=${e?.type}:${e?.value}`)
      .join("\n");
  };

  const formatURLs = (): string => {
    return data?.URLS.map(
      (e: EProps) => `X-SOCIALPROFILE;TYPE=${e?.type}:${e?.value}`
    ).join("\n");
  };

  const formatAddresses = (): string => {
    return data?.addresses
      .map((e: EProps) => `ADR;TYPE=${e?.type}:${e?.value}`)
      .join("\n");
  };

  let vcfString = `BEGIN:VCARD
VERSION:4.0
N:${getName()};;;
FN:${getFullName()}
ORG:${data?.organizationName}
TITLE:${data?.jobTitle}
${formatEmails()}
${formatPhones()}
${formatURLs()}
${formatAddresses()}`;

  if (data?.personal) {
    vcfString += `\nNOTE:Saved via Doorway: https://www.doorway.io`;
  }

  vcfString += `\nEND:VCARD`;

  return vcfString;
};
