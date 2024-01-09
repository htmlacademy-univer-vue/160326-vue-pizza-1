<script setup>
import AppLayout from "./layouts/AppLayout.vue";
</script>

<template>
  <AppLayout />
</template>
<template>
  <app-layout>
    <home-view />
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { HomeView } from "@/views";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
