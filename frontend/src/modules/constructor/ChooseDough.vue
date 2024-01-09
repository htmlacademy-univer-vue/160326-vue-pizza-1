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
      :checked="index === 0"
      @input="changeDough(dough)"
    />
    <b>{{ dough.name }}</b>
    <span>{{ dough.description }}</span>
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
const emit = defineEmits(["changeDough"]);

const changeDough = (dough) => {
  emit("changeDough", dough);
};
</script>
