<template>
  <div v-for="n in 10" :key="n">
    <div class="skeletons-items">
      <q-skeleton height="55px"></q-skeleton>
    </div>
  </div>
</template>

<style scoped>
.skeletons-items {
  margin: 5px;
}
</style>
