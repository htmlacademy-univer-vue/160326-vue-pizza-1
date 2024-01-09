<template>
  <label
    v-for="(size, index) in items"
    :key="index"
    class="diameter__input"
    :class="`diameter__input--${size.latinName}`"
  >
    <input
      type="radio"
      name="diameter"
      :value="size.latinName"
      class="visually-hidden"
      :checked="props.modelValue.getSize === size"
      @input="props.modelValue.changeSize(size)"
    />
    <span>{{ size.name }}</span>
  </label>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/blocks/diameter.scss";
</style>
