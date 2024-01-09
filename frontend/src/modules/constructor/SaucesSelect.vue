<script setup>
const props = defineProps({
  saucesTypes: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label class="radio ingredients__input" v-for="sauceType in saucesTypes">
      <input type="radio" name="sauce" :value="sauceType.value" checked />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>
