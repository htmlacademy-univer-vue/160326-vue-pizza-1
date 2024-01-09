<template>
    <app-header/>
    <slot/>
</template>

<script setup>
    import AppHeader from "./AppHeader.vue";
    import {AppLayout} from "@/layouts/index";
</script>
