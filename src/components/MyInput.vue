<template>
  <q-input
    style="color: aliceblue !important"
    lazy-rules
    outlined
    dense
    label-color="white"
    color="grey-8"
    bg-color="grey-10"
    class="text-white full-width input"
  />
</template>

<style scoped>
.input {
  border-radius: 5px;
  transition: 0.5s;
  caret-color: white;
}

.q-input:deep(.q-field__control) {
  border: 1px solid #333;
}
.q-input:deep(.q-field__native) {
  color: #fff;
}
</style>
