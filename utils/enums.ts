export const Environment = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
};

const PASS_VIEW = {
  APPLE: "apple",
  ANDROID: "android",
};

const ACCOUNT_TYPE = {
  PERSONAL: "personal",
  ORGANIZATION: "organization",
};

const LANGUAGES = {
  ENGLISH: "English",
  URDU: "Urdu",
  ESPANIO: "Espanio",
  ITALIAN: "Italian",
};

const DEVICES = ["Android", "Apple"];

const ROLES = {
  0: "employee",
  1: "user",
  2: "organization",
  3: "enterprise",
  4: "superAdmin",
};

const MAXDOORWAYS = [1, 2, 3, 4, 5];

const PERMISSIONS = [
  { id: "prefix", label: "Prefix" },
  { id: "sufix", label: "Suffix" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "organizationName", label: "Company" },
  { id: "jobTitle", label: "Job Title" },
  { id: "phones", label: "Phone Number" },
  { id: "emails", label: "Emails" },
  { id: "urls", label: "URLs" },
];

export default {
  Environment,
  PASS_VIEW,
  ACCOUNT_TYPE,
  ROLES,
  LANGUAGES,
  DEVICES,
  MAXDOORWAYS,
  PERMISSIONS,
};
