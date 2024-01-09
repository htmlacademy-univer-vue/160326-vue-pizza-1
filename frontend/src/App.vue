<template>
  <app-layout>
    <router-view v-slot="{ Component }">
      <transition
        name="view"
        appear
        :enter-active-class="
          routeLayout === 'SimpleLayout'
            ? 'animate__animated animate__fadeIn'
            : 'animate__animated animate__bounceInRight'
        "
      >
        <component :is="Component"/>
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import { RouterView } from "vue-router";
import { AppLayout } from "@/layouts";
import { useDataStore } from "@/stores/data";

import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const routeLayout = computed(() => route.meta.layout);

const dataStore = useDataStore();

void dataStore.fetchDoughs();
void dataStore.fetchSizes();
void dataStore.fetchSauces();
void dataStore.fetchIngredients();
void dataStore.fetchMiscs();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
</style>
