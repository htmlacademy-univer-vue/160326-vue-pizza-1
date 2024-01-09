<template>
  <label
    v-for="(sauce, index) in items"
    :key="index"
    class="radio ingredients__input"
  >
    <input
      type="radio"
      name="sauce"
      :value="sauce.latinName"
      :checked="props.modelValue.getSauce === sauce"
      @input="props.modelValue.changeSauce(sauce)"
    />
    <span>{{ sauce.name }}</span>
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
@import "@/assets/scss/mixins/m_clear-list.scss";
@import "@/assets/scss/blocks/ingredients.scss";
@import "@/assets/scss/blocks/filling.scss";
@import "@/assets/scss/blocks/radio.scss";
</style>
