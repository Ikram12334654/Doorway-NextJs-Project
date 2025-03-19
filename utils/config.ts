import { Environment } from "./enums";

interface EnvConfig {
  API_URL: string;
  APP_URL: string;
}

const env: EnvConfig = {
  API_URL: "http://localhost:5000/api",
  APP_URL: "http://localhost:3000",
};

if (process.env.NEXT_PUBLIC_ENV === Environment.PRODUCTION) {
  env.API_URL = "";
  env.APP_URL = "";
}

export default env;
