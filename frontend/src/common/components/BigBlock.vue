<template>
  <div class="content__wrapper">
      <TitleString :primary=primary>
          <slot name="title"/>
      </TitleString>
      <slot />
  </div>
</template>

<script setup>
import TitleString from "@/common/components/TitleString.vue";
    defineProps({
        primary: { type: Boolean, default: true}
    });
</script>