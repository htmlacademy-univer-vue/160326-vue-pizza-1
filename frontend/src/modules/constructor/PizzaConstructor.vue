<template>
  <app-drop>
    <div class="content__constructor">
      <div
        ref="pizza"
        class="pizza"
        :class="`pizza--foundation--${modelValue.dough.latinName}-${modelValue.sauce.latinName}`"
      >
        <div class="pizza__wrapper">
          <div
            v-for="(ingredient, index) in filteredIngredients"
            :key="index"
            class="pizza__filling"
            :class="[
              `pizza__filling--${ingredient.name}`,
              ingredient.count === 2
                ? 'pizza__filling--second'
                : ingredient.count === 3
                ? 'pizza__filling--third'
                : '',
            ]"
          ></div>
        </div>
      </div>
    </div>
  </app-drop>
</template>
<script setup>
import AppDrop from "@/common/components/AppDrop.vue";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
  },
});

const filteredIngredients = computed(() => {
  const ingredients = props.modelValue.ingredients;

  return Object.entries(ingredients)
    .map(([name, count]) => ({ name, count }))
    .filter((ingredient) => ingredient.count > 0);
});
</script>
