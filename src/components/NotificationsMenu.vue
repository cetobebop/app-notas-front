<template>
  <div>
    <NotificationButton @click="onClick" />
    <NotificationDialog
      @hide="hide"
      :notes="notificationStore.notifications"
      v-model="alert"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import NotificationButton from "./NotificationButton.vue";
import NotificationDialog from "./NotificationDialog.vue";
import { useEvtSourceStore } from "src/stores/evtSourceStore";
import { useNotificationStore } from "src/stores/notifications";

const notificationStore = useNotificationStore();
notificationStore.getNotificationLength();

const evtSourceStore = useEvtSourceStore();
evtSourceStore.notesServerEvent();

const alert = ref(false);

async function onClick() {
  await notificationStore.getNotificationLength();

  if (notificationStore.notificationsLength) {
    notificationStore.getNotifications();

    alert.value = true;
  }
}

function hide() {
  alert.value = false;
}
</script>
