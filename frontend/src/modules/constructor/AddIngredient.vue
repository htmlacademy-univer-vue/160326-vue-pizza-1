<template>
  <li
    v-for="(ingredient, index) in items"
    :key="ingredient.id"
    class="ingredients__item"
  >
    <app-drag
      :transfer-data="ingredient"
      :draggable="props.modelValue.getIngredientCount(ingredient) < 3"
    >
      <span class="filling" :class="`filling--${ingredient.latinName}`">{{
        ingredient.name
      }}</span>
    </app-drag>
    <app-counter
      :value="props.modelValue.getIngredientCount(ingredient)"
      :max="MAX_INGREDIENT_COUNT"
      :color="`green`"
      class="ingredients__counter"
      @increment-counter="props.modelValue.incrementIngredient(ingredient)"
      @decrement-counter="props.modelValue.decrementIngredient(ingredient)"
    ></app-counter>
  </li>
</template>
<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
import { MAX_INGREDIENT_COUNT } from "@/common/constants";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
  },
  items: {
    type: Array,
    default: () => [],
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/mixins/m_clear-list.scss";
@import "@/assets/scss/blocks/filling.scss";
@import "@/assets/scss/blocks/ingredients.scss";
</style>
