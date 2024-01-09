<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'HomeView' }" class="logo"
        ><img
          src="http://127.0.0.1:3000/public/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
      /></router-link>
    </div>
    <div class="header__cart">
      <router-link :to="{ name: 'CartView' }"
        >{{ cart.getFullPrice }} ₽</router-link
      >
    </div>
    <div class="header__user">
      <router-link v-if="auth.user" :to="{ name: 'ProfileView' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="http://127.0.0.1:3000/public/img/users/user5.jpg"
            srcset="http://127.0.0.1:3000/public/img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a v-if="auth.user" class="header__logout" @click="logout"
        ><span>Выйти</span></a
      >
      <router-link v-if="!auth.isAuthenticated" :to="{ name: 'LoginView' }"
        ><span>Войти</span></router-link
      >
    </div>
  </header>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const cart = useCartStore();
const user = useProfileStore();
const auth = useAuthStore();

async function logout() {
  await auth.logout();
  await router.push("/");
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/layout/header.scss";
</style>
