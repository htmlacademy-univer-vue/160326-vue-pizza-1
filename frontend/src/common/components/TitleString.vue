<template>
  <h1 v-if="primary" class="title title--big"><slot /></h1>
  <h2 v-else class="title title--small"><slot /></h2>
</template>

<script setup>
    defineProps({
        primary: { type: Boolean, default: true}
    });
</script>