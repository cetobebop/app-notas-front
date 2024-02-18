<template>
  <q-btn dense round flat icon="notifications">
    <q-badge
      v-if="notificationStore.notificationsLength"
      color="red"
      floating
      transparent
    >
      {{ notificationStore.notificationsLength }}
    </q-badge>
  </q-btn>
</template>

<script setup>
import { useNotificationStore } from "src/stores/notifications";

const notificationStore = useNotificationStore();
</script>
