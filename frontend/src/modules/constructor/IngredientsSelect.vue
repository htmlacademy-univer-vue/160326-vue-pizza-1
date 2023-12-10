<script setup>
import FillingsSelect from "./FillingsSelect.vue";
import SaucesSelect from "./SaucesSelect.vue";

const props = defineProps({
  saucesTypes: {
    type: Array,
    required: true,
  },
  ingredientsTypes: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <SaucesSelect :sauces-types="saucesTypes" />

        <FillingsSelect :ingredients-types="ingredientsTypes" />
      </div>
    </div>
  </div>
</template>
