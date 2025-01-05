import axios, { AxiosRequestConfig, Method } from "axios";
import env from "./config";

const BASE_URL = `${env.API_URL}`;

interface ApiOptions {
  payload?: any;
}

export default async function Api<T>(
  path: string,
  method: Method,
  option?: ApiOptions,
  authToken?: string
): Promise<{ response?: T; error?: string }> {
  const url = BASE_URL + path;

  const headers: AxiosRequestConfig["headers"] = {
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };

  try {
    const response = await axios({
      method,
      url,
      data: option?.payload,
      headers,
    });

    return { response: response.data };
  } catch (error: any) {
    if (error.response?.status === 401) {
    }
    return { error: error.response?.data || error.message };
  }
}
