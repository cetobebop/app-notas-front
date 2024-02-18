<template>
  <div>
    <optionPanelBtn
      name-icon="logout"
      message="Cerrar Session"
      @click="logoutSession"
    ></optionPanelBtn>
  </div>
</template>

<script setup>
import optionPanelBtn from "./optionPanelBtn.vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

async function logoutSession() {
  try {
    await userStore.logout();
    router.push("/login");
  } catch (error) {
    console.log(error, "error en logout");
  }
}
</script>
