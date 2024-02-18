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
      localStorage.setItem("user", res.data.id);
    } catch (error) {
      localStorage.removeItem("user");
      throw Error(error.response.data.errors[0].msg);
    }
  }

  const refresh = async () => {
    try {
      const { data } = await api.post("/auth/refresh");

      token.value = data.token;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error, " err logout");
    } finally {
      token.value = "";
      localStorage.removeItem("user");
      evtSourceStore.closeEventSource();
    }
  };

  return {
    token,
    login,
    logout,
    refresh,
    register,
  };
});
