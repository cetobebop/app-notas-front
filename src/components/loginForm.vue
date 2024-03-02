<template>
  <q-form class="col-12 form" @submit.prevent="onSubmit">
    <MyInput
      v-model="email"
      :rules="[vEmail]"
      class="q-mb-sm"
      label="Email"
    ></MyInput>
    <MyInput
      type="password"
      v-model="password"
      :rules="[vPassword]"
      class="q-mb-sm"
      label="Contraseña"
    ></MyInput>
    <MyBtn
      type="submit"
      label="Ingresar"
      :loading="loading"
      class="full-width"
    ></MyBtn>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import MyInput from "./MyInput.vue";
import MyBtn from "./MyBtn.vue";
import { useRules } from "../composables/inputRules.js";
import { useUserStore } from "../stores/userStore.js";
import { useNotify } from "../composables/Notify";
import { useRouter } from "vue-router";

const email = ref("prueba@gmail.com");
const password = ref("1234567");

const loading = ref(false);

const { vPassword, vEmail } = useRules();
const userStore = useUserStore();
const router = useRouter();

async function onSubmit() {
  try {
    loading.value = true;
    await userStore.login(email.value, password.value);
    router.push("/");
  } catch (error) {
    useNotify(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.form {
  margin-bottom: 20px;
}
</style>
