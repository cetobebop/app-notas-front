<template>
  <q-form @submit.prevent="onSubmit">
    <MyInput
      label="Email"
      :rules="[vEmail]"
      class="q-mb-sm"
      v-model="email"
    ></MyInput>
    <MyInput
      label="Contraseña"
      :rules="[vPassword]"
      v-model="password"
    ></MyInput>
    <div class="row justify-end q-gutter-sm">
      <MyBtn label="Cancelar" v-close-popup></MyBtn>
      <MyBtn type="submit" label="Ingresar" :loading="loading"></MyBtn>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import MyInput from "./MyInput.vue";
import MyBtn from "./MyBtn.vue";
import { useRules } from "src/composables/inputRules";
import { useUserStore } from "../stores/userStore.js";
import { useNotify } from "src/composables/Notify";
import { useRouter } from "vue-router";

const { vEmail, vPassword } = useRules();
const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");

const loading = ref(false);

async function onSubmit() {
  try {
    loading.value = true;
    await userStore.register(email.value, password.value);
    router.push("/");
  } catch (error) {
    useNotify(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
