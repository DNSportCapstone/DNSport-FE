import axios from "axios";
import store from "@/store";

const API = axios.create({
  baseURL: "https://localhost:7247/api",
});

API.interceptors.request.use(
  (config) => {
    const token =
      store.getters.accessToken || localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await API.post("/auth/access-token", {
        refreshToken:
          store.getters.refreshToken ?? localStorage.getItem("refreshToken"),
      })
        .then((response) => {
          if (response.data.accessToken) {
            store.dispatch("setAccessToken", response.data.accessToken);
            return API.request(error.config);
          } else {
            store.dispatch("logout");
            return Promise.reject(error);
          }
        })
        .catch((refreshError) => {
          store.dispatch("logout");
          return Promise.reject(refreshError);
        });
    }
    return Promise.reject(error);
  }
);

export default API;
