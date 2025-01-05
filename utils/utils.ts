interface VFCProps {
  prefix?: string;
  sufix?: string;
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  emails?: string[];
  phones?: string[];
  jobTitle?: string;
  photo?: string;
  URLS?: string[];
  addresses?: string[];
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
    return phones.map((phone) => `TEL;TYPE=WORK:${phone}`).join("\n");
  };

  const formatEmails = (): string => {
    return emails.map((email) => `EMAIL;TYPE=WORK:${email}`).join("\n");
  };

  const formatURLs = (): string => {
    return URLS.map((url) => `X-SOCIALPROFILE;TYPE=WORK:${url}`).join("\n");
  };

  const formatAddresses = (): string => {
    return addresses.map((address) => `ADR;TYPE=WORK:${address}`).join("\n");
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
