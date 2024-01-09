<template>
  <li
    v-for="(ingredient, index) in items"
    :key="ingredient.id"
    class="ingredients__item"
  >
    <app-drag
      :transfer-data="ingredient"
      :draggable="getIngredientCount(ingredient) < 3"
    >
      <span class="filling" :class="`filling--${ingredient.latinName}`">{{
        ingredient.name
      }}</span>
    </app-drag>
    <div class="counter counter--orange ingredients__counter">
      <button
        type="button"
        class="counter__button counter__button--minus"
        :disabled="getIngredientCount(ingredient) === 0"
        @click="decrementCounter(ingredient)"
      >
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        disabled
        name="counter"
        class="counter__input"
        :value="getIngredientCount(ingredient)"
      />
      <button
        type="button"
        class="counter__button counter__button--plus"
        :disabled="getIngredientCount(ingredient) === MAX_INGREDIENT_COUNT"
        @click="incrementCounter(ingredient)"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>
  </li>
</template>
<script setup>
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

const emit = defineEmits(["incrementIngredient", "decrementIngredient"]);

const getIngredientCount = (ingredient) => {
  return props.modelValue[ingredient.latinName]
    ? props.modelValue[ingredient.latinName]
    : 0;
};

const incrementCounter = (ingredient) => {
  if (getIngredientCount(ingredient) < MAX_INGREDIENT_COUNT) {
    emit("incrementIngredient", ingredient);
  }
};

const decrementCounter = (ingredient) => {
  if (getIngredientCount(ingredient) > 0) {
    emit("decrementIngredient", ingredient);
  }
};
</script>
