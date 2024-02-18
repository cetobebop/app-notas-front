<template>
  <h1 class="text-subtitle2 text-weight-bold">
    ¿No tienes una cuenta?
    <a @click="active = true" id="a">Crea una cuenta</a>
  </h1>

  <registerModal :value="active" @change="active = false"></registerModal>
</template>

<script setup>
import { ref } from "vue";
import registerModal from "./registerModal.vue";

const active = ref(false);
</script>

<style scoped lang="scss">
h1 {
  color: #777;
}

#a {
  --tw-text-opacity: 1;
  color: rgb(167 139 250 / var(--tw-text-opacity));
  transition: 0.3s;
  cursor: pointer;
}

#a:hover {
  color: rgb(182 159 280 / var(--tw-text-opacity));
  transition: 0.2s;
}
</style>
