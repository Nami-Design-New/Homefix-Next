import axios from "axios";

axios.defaults.baseURL = "https://homefixapp.com/api/";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

const clientAxios = axios.create();

clientAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const cookies = document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="));
      const lang = cookies ? cookies.split("=")[1] : "ar";
      config.headers["Accept-Language"] = lang;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientAxios;
