<template>
  <q-circular-progress
    size="sm"
    :value="percentage"
    color="black"
    class="self-center"
  />
</template>

<script setup>
import { watchEffect } from "vue";
import { ref } from "vue";
const props = defineProps(["totalSeconds", "timeLeft"]);
const percentage = ref(null);

watchEffect(() => {
  percentage.value = parseInt(
    100 - Math.abs((props.timeLeft / props.totalSeconds) * 100)
  );
});
</script>
