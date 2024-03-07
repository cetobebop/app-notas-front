import { boot } from "quasar/wrappers";
import axios from "axios";
import axiosRetry from "axios-retry";

import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const api = axios.create({
  baseURL: process.env.URL_SERVER,
  withCredentials: true,
});

api.interceptors.response.use(null, async function (error) {
  if (error.response.status === 401) {
    if (error?.response?.data?.errors[0]?.field === "x_access_token") {
      await userStore.refresh();

      error.config.headers["x_access_token"] = userStore.token;
    }
  }

  return Promise.reject(error);
});

axiosRetry(api, {
  retries: 3,
  retryCondition(error) {
    if (error.response.status === 401) {
      return true;
    }

    return false;
  },
  onRetry: async (retryCount) => {
    if (retryCount === 3) {
      userStore.logout();
      location.reload();
    }
    return;
  },
});

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { api };
