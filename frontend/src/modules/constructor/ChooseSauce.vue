<template>
  <label
    v-for="(sauce, index) in items"
    :key="sauce.id"
    class="radio ingredients__input"
  >
    <input
      type="radio"
      name="sauce"
      :value="sauce.latinName"
      :checked="index === 0"
      @input="changeSauce(sauce)"
    />
    <span>{{ sauce.name }}</span>
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

const emit = defineEmits(["changeSauce"]);

const changeSauce = (sauce) => {
  emit("changeSauce", sauce);
};
</script>
