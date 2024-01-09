<template>
  <main class="layout">
    <sidebar-layout />

    <div class="layout__content">
      <router-view/>
    </div>
  </main>
</template>

<script setup>
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import { RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/blocks/user.scss";
@import "@/assets/scss/blocks/address-form.scss";
</style>
