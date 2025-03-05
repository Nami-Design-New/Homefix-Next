import axios from "axios";
import { cookies } from "next/headers";
import { API_URL } from "./constants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const lang = (await cookies().get("NEXT_LOCALE")?.value) || "ar";
    config.headers["Accept-Language"] = lang;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
