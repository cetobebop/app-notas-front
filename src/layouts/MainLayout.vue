<template>
  <q-layout view="hhh lpR fFf">
    <q-header class="bg-white text-black">
      <header-components></header-components>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import headerComponents from "src/components/headerComponents.vue";
</script>

<style scoped>
.q-header {
  border-bottom: 2px solid #e5e7eb;
}
</style>
