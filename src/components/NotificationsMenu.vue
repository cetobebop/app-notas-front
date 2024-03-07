<template>
  <div>
    <NotificationButton @click="onClick" />
    <NotificationDialog
      @hide="hide"
      :notesLength="notesLength"
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
const notesLength = ref(null);

async function onClick() {
  await notificationStore.getNotificationLength();

  notesLength.value = notificationStore.notificationsLength;

  if (notificationStore.notificationsLength) {
    notificationStore.getNotifications();

    notificationStore.notificationsLength = 0;
    alert.value = true;
  }
}

function hide() {
  alert.value = false;
  notificationStore.notifications = [];
}
</script>
