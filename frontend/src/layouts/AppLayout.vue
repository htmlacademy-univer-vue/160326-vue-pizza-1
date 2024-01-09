<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup>
import { useRoute } from "vue-router";
import { watch, shallowRef } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

const route = useRoute();
const layout = shallowRef(null);

watch(
  () => route.meta,
  async (meta) => {
    try {
      if (meta.layout) {
        const component = await import(/* @vite-ignore */`./${meta.layout}.vue`);
        layout.value = component?.default || DefaultLayout;
      } else {
        layout.value = DefaultLayout;
      }
    } catch (e) {
      console.error("Layout not found", e);
      layout.value = DefaultLayout;
    }
  }
);
</script>
