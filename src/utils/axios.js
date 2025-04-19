import axios from "axios";
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;
const API = axios.create({
  baseURL: apiUrl + "/api",
});

API.interceptors.request.use(
  (config) => {
    store.dispatch("setLoading", true);
    const token =
      store.getters.accessToken || localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    store.dispatch("setLoading", false);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    store.dispatch("setLoading", false);
    return response;
  },
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
            store.dispatch("setLoading", false);
            return Promise.reject(error);
          }
        })
        .catch((refreshError) => {
          store.dispatch("logout");
          store.dispatch("setLoading", false);
          return Promise.reject(refreshError);
        });
    }
    store.dispatch("setLoading", false);
    return Promise.reject(error);
  }
);

export default API;
