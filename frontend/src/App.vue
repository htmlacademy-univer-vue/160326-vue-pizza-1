<template>
  <app-layout>
    <router-view />
  </app-layout>
</template>

<script setup>
import {RouterView} from "vue-router";
import { AppLayout } from "@/layouts";
import {useDataStore} from "@/stores/data";

const dataStore = useDataStore()

void dataStore.fetchDoughs()
void dataStore.fetchSizes()
void dataStore.fetchSauces()
void dataStore.fetchIngredients()
void dataStore.fetchMiscs()
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
