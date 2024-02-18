<template>
  <div
    class="full-width row justify-start items-center q-pl-lg"
    style="min-height: 40px"
  >
    <q-icon :name="nameIcon" size="1.4em" class="q-mr-sm" />

    <span
      style="width: fit-content; height: fit-content"
      class="text-weight-medium"
      >{{ message }}</span
    >
  </div>
</template>

<script setup>
defineProps(["nameIcon", "message"]);
</script>

<style scoped>
div {
  opacity: 0.66;
}
</style>
