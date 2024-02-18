<template>
  <div>
    <q-dialog :model-value="value" @hide="$emit(`change`)" persistent>
      <q-card style="min-width: 50%" class="row bg">
        <q-card-section class="col-12">
          <div class="text-h6 text-white">Crear Cuenta</div>
        </q-card-section>

        <q-card-section class="q-pt-none col-12">
          <registerForm></registerForm>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import registerForm from "./registerForm.vue";
const props = defineProps(["value"]);
</script>

<style scoped lang="scss">
.bg {
  background: #333;
}

.btn {
  font-weight: 700;
}
</style>
