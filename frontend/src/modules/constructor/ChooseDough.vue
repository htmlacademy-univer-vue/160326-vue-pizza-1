<template>
  <label
    v-for="(dough, index) in items"
    :key="dough.id"
    class="dough__input"
    :class="`dough__input--${dough.latinName}`"
  >
    <input
      type="radio"
      name="dought"
      :value="dough.latinName"
      class="visually-hidden"
      :checked="props.modelValue.getDough === dough"
      @input="props.modelValue.changeDough(dough)"
    />
    <b>{{ dough.name }}</b>
    <span>{{ dough.description }}</span>
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
@import "@/assets/scss/blocks/dough.scss";
</style>
