import axios from "axios";
import { cookies } from "next/headers";
axios.defaults.baseURL = "https://homefixapp.com/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const lang = cookies().get("NEXT_LOCALE")?.value || "ar";
    config.headers["Accept-Language"] = lang;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
