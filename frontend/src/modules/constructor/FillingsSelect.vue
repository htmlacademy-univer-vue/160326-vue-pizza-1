<script setup>
const props = defineProps({
  ingredientsTypes: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        class="ingredients__item"
        v-for="ingredientType in ingredientsTypes"
        :key="ingredientType.id"
      >
        <span class="filling" :class="`filling--${ingredientType.value}`">
          {{ ingredientType.name }}
        </span>

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            disabled
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input type="text" name="counter" class="counter__input" value="0" />
          <button type="button" class="counter__button counter__button--plus">
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
