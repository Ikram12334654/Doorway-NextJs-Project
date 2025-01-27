interface VFCProps {
  prefix?: string;
  sufix?: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  emails?: { type?: string; value: string }[];
  phones?: { type?: string; value: string }[];
  jobTitle?: string;
  photo?: string;
  URLS?: { type?: string; value: string }[];
  addresses?: { type?: string; value: string }[];
  personal?: boolean;
}

export const vcfText = ({
  prefix = "",
  sufix = "",
  firstName = "",
  lastName = "",
  organizationName = "",
  emails = [],
  phones = [],
  jobTitle = "",
  photo = "",
  URLS = [],
  addresses = [],
  personal = false,
}: VFCProps): string => {
  const getFullName = (): string => {
    const nameParts = [prefix, firstName, lastName, sufix].filter(Boolean);
    return nameParts.join(" ").trim();
  };

  const formatPhones = (): string => {
    // return phones.map((phone) => `TEL;TYPE=WORK:${phone}`).join("\n");
    return "";
  };

  const formatEmails = (): string => {
    return emails
      .map((data) => `EMAIL;TYPE=${data?.type || "WORK"}:${data?.value}`)
      .join("\n");
  };

  const formatURLs = (): string => {
    // return URLS.map((url) => `X-SOCIALPROFILE;TYPE=WORK:${url}`).join("\n");
    return "";
  };

  const formatAddresses = (): string => {
    // return addresses.map((address) => `ADR;TYPE=WORK:${address}`).join("\n");
    return "";
  };

  let vcfString = `BEGIN:VCARD
VERSION:3.0
FN:${getFullName()}
ORG:${organizationName}
TITLE:${jobTitle}
PHOTO;VALUE=URL:${photo}
${formatEmails()}
${formatPhones()}
${formatURLs()}
${formatAddresses()}`;

  if (personal) {
    vcfString += `\nNOTE:Saved via Doorway: https://www.doorway.io`;
  }

  vcfString += `\nEND:VCARD`;

  return vcfString;
};
