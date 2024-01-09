<template>
  <label
    v-for="(size, index) in items"
    :key="size.id"
    class="diameter__input"
    :class="`diameter__input--${size.latinName}`"
  >
    <input
      type="radio"
      name="diameter"
      :value="size.latinName"
      class="visually-hidden"
      :checked="index === 0"
      @input="changeSize(size)"
    />
    <span>{{ size.name }}</span>
  </label>
</template>
<script setup>
defineProps({
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

const emit = defineEmits(["changeSize"]);

const changeSize = (size) => {
  emit("changeSize", size);
};
</script>
