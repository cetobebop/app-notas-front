<template>
  <q-page class="background">
    <div class="row justify-center full width">
      <div
        class="row justify-center window-height content-center col-xl-4 col-md-4 col-sm-6 col-xs-10"
      >
        <h1 class="text-h4 text-weight-medium text-white">Ingresa tu cuenta</h1>
        <loginForm></loginForm>
        <registerContainer></registerContainer>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import loginForm from "src/components/loginForm.vue";
import registerContainer from "src/components/registerContainer.vue";
</script>

<style scoped>
.background {
  background: #111;
}

h1 {
  margin-bottom: 50px;
}
</style>
