<script setup>
import HomeView from "../views/HomeView.vue";
import AppHeader from "./AppHeader.vue";
</script>
<template>
  <AppHeader />
  <HomeView />
</template>

<style lang="scss">
// general
@import "@/assets/sass/libs/normalize.scss";
@import "@/assets/sass/fonts.scss";
@import "@/assets/sass/mixins/mixins.scss";
@import "@/assets/sass/ds-system/ds-styles.scss";
@import "@/assets/sass/visually-hidden.scss";
@import "@/assets/sass/scaffolding.scss";

// layout
@import "@/assets/sass/layout/main.scss";
@import "@/assets/sass/layout/header.scss";
@import "@/assets/sass/layout/content.scss";
@import "@/assets/sass/layout/sheet.scss";
@import "@/assets/sass/layout/container.scss";
@import "@/assets/sass/layout/layout.scss";
@import "@/assets/sass/layout/popup.scss";
@import "@/assets/sass/layout/layout-form.scss";
@import "@/assets/sass/layout/sign-form.scss";

// blocks
@import "@/assets/sass/blocks/icon.scss";
@import "@/assets/sass/blocks/logo.scss";
@import "@/assets/sass/blocks/close.scss";
@import "@/assets/sass/blocks/input.scss";
@import "@/assets/sass/blocks/select.scss";
@import "@/assets/sass/blocks/radio.scss";
@import "@/assets/sass/blocks/button.scss";
@import "@/assets/sass/blocks/counter.scss";
@import "@/assets/sass/blocks/title.scss";
@import "@/assets/sass/blocks/filling.scss";
@import "@/assets/sass/blocks/pizza.scss";
@import "@/assets/sass/blocks/dough.scss";
@import "@/assets/sass/blocks/diameter.scss";
@import "@/assets/sass/blocks/ingredients.scss";
@import "@/assets/sass/blocks/cart-list.scss";
@import "@/assets/sass/blocks/cart.scss";
@import "@/assets/sass/blocks/product.scss";
@import "@/assets/sass/blocks/additional-list.scss";
@import "@/assets/sass/blocks/cart-form.scss";
@import "@/assets/sass/blocks/footer.scss";
@import "@/assets/sass/blocks/order.scss";
@import "@/assets/sass/blocks/user.scss";
@import "@/assets/sass/blocks/address-form.scss";
</style>
