import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

import { useUserStore } from "./userStore";

export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref([]);
  const notificationsLength = ref();
  const userStore = useUserStore();

  const loading = ref(null);

  async function getNotifications() {
    try {
      loading.value = true;
      const { data } = await api.get("/notifications/notification", {
        headers: {
          x_access_token: userStore.token,
        },
      });
      notifications.value = data.notification;

      notificationsLength.value = 0;
    } catch (error) {
      console.log("error en notification store");
    } finally {
      loading.value = false;
    }
  }

  async function getNotificationLength() {
    try {
      const { data } = await api.get("/notifications/notificationlength", {
        headers: {
          x_access_token: userStore.token,
        },
      });
      notificationsLength.value = data.notificationLength;
    } catch (error) {
      console.log("error en notification store");
    }
  }

  return {
    notifications,
    notificationsLength,
    getNotifications,
    getNotificationLength,
    loading,
  };
});
