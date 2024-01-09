<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="{ name: 'HomeView' }" class="logo"
        ><img
          src="@/assets/img/logo.svg"
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
      <router-link :to="{ name: 'ProfileView' }">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5.webp    1x,
              @/assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5.jpg"
            srcset="@/assets/img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </router-link>
      <a href="#" class="header__logout"><span>Выйти</span></a>
      <router-link :to="{ name: 'LoginView' }"><span>Войти</span></router-link>
    </div>
  </header>
</template>
<script setup>
import { useCartStore } from "@/stores/cart";
import { useProfileStore } from "@/stores/profile";

const cart = useCartStore();
const user = useProfileStore();
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/layout/header.scss";
</style>
