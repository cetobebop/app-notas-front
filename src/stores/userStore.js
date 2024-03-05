import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useEvtSourceStore } from "./evtSourceStore";

export const useUserStore = defineStore("userStore", () => {
  const evtSourceStore = useEvtSourceStore();
  const token = ref("");

  const login = async (userEmail, password) => {
    try {
      const res = await api.post("/auth/login", { userEmail, password });
      token.value = res.data.token;

      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", res.data.id);
    } catch (error) {
      localStorage.removeItem("user");

      throw Error(error.response.data.errors[0].msg);
    }
  };

  async function register(userEmail, password) {
    try {
      const res = await api.post("/auth/singup", { userEmail, password });
      console.log(res.data);
      token.value = res.data.token;

      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("user", res.data.id);
    } catch (error) {
      console.log(error);
      localStorage.removeItem("user");
      throw Error(error.response.data.errors[0].msg);
    }
  }

  const refresh = async () => {
    try {
      const refreshtoken = localStorage.getItem("refreshToken");
      const { data } = await api.post(
        "/auth/refresh",
        {},
        {
          headers: { refreshtoken },
        }
      );

      token.value = data.token;
    } catch (error) {
      console.log(error);
      console.log("error en refresh");
      // logout();
      // location.reload();
    }
  };

  const logout = () => {
    token.value = "";
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    evtSourceStore.closeEventSource();
  };

  return {
    token,
    login,
    logout,
    refresh,
    register,
  };
});
