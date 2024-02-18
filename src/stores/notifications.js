import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

import { useUserStore } from "./userStore";

export const useNotificationStore = defineStore("notificationStore", () => {
  const notifications = ref([]);
  const notificationsLength = ref();
  const userStore = useUserStore();

  async function getNotifications() {
    console.log("se obtuvieron las notificaciones");
    try {
      const { data } = await api.get("/notifications/notification", {
        headers: {
          x_access_token: userStore.token,
        },
      });
      notifications.value = data.notification;
      console.log(notifications.value);
      notificationsLength.value = 0;
    } catch (error) {
      console.log("error en notification store");
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
      console.log(data.notificationLength);
    } catch (error) {
      console.log("error en notification store");
    }
  }

  return {
    notifications,
    notificationsLength,
    getNotifications,
    getNotificationLength,
  };
});
