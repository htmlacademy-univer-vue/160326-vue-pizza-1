<template>
  <div class="sign-form">
    <router-link :to="{ name: 'HomeView' }" class="close close--white"
      ><span class="visually-hidden"
        >Закрыть форму авторизации</span
      ></router-link
    >
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="login">
      <app-input
        v-model="email"
        label-name="E-mail"
        type="email"
        name="email"
        placeholder="example@mail.ru"
        :error-text="validations.email.error"
      />
      <app-input
        v-model="password"
        label-name="Пароль"
        type="password"
        name="password"
        placeholder="***********"
        :error-text="validations.password.error"
      />

      <button type="submit" class="button">Авторизоваться</button>
      <div v-if="serverErrorMessage" class="error">
        {{ serverErrorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();
import { validateFields, clearValidationErrors } from "@/common/validator";
import AppInput from "@/common/components/AppInput.vue";

async function login() {
  if (
    !validateFields(
      { email: email.value, password: password.value },
      validations.value
    )
  ) {
    return;
  }
  const responseMessage = await authStore.login({
    email: email.value,
    password: password.value,
  });
  if (responseMessage !== "success") {
    serverErrorMessage.value = responseMessage;
  } else {
    await authStore.whoami();
    if (router.currentRoute.value.query.redirect) {
      await router.push(`${router.currentRoute.value.query.redirect}`);
    } else {
      await router.push("/");
    }
  }
}

const setEmptyValidations = () => ({
  email: {
    error: "",
    rules: ["required", "email"],
  },
  password: {
    error: "",
    rules: ["required"],
  },
});

const email = ref("");
const password = ref("");
const serverErrorMessage = ref(null);
const validations = ref(setEmptyValidations());

watch(email, () => {
  if (validations.value.email.error) clearValidationErrors(validations.value);
  if (serverErrorMessage.value !== null) {
    serverErrorMessage.value = null;
  }
});

watch(password, () => {
  if (validations.value.password.error)
    clearValidationErrors(validations.value);
  if (serverErrorMessage.value !== null) {
    serverErrorMessage.value = null;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/layout/sign-form.scss";
@import "@/assets/scss/blocks/close.scss";
.error {
  text-align: center;
  color: $red-800;
  margin-top: 10px;
}
</style>
