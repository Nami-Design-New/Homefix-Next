import axios from "axios";
import { cookies } from "next/headers";
import { API_URL } from "../_utils/constants";

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookiesStore = await cookies();
    const lang = cookiesStore.get("NEXT_LOCALE")?.value || "ar";
    const token = cookiesStore.get("token")?.value || "";
    config.headers["Accept-Language"] = lang;
    config.headers["Authorization"] = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
