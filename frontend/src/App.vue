<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import {RouterView} from "vue-router";
import { AppLayout } from "@/layouts";
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
