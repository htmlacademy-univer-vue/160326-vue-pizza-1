<template>
  <div class="sheet">
    <TitleString :primary="primary" class="sheet__title">
      <slot name="title" />
    </TitleString>
    <div class="sheet__content" :class="className">
      <slot />
    </div>
  </div>
</template>

<script setup>
import TitleString from "@/common/components/TitleString.vue";
defineProps({
  primary: { type: Boolean, default: false },
  className: { type: String, default: "" },
});
</script>
