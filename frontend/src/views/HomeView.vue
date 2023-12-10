<script setup>
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSizes,
  normalizeSauces,
} from "../common/helpers";

import doughJSON from "../mocks/dough.json";
import ingredientsJSON from "../mocks/ingredients.json";
import sizesJSON from "../mocks/sizes.json";
import saucesJSON from "../mocks/sauces.json";
import DoughSelect from "../modules/constructor/DoughSelect.vue";
import SizesSelect from "../modules/constructor/SizesSelect.vue";
import IngredientsSelect from "../modules/constructor/IngredientsSelect.vue";
import Pizza from "../modules/constructor/Pizza.vue";

const doughTypes = doughJSON.map(normalizeDough);
const ingredientsTypes = ingredientsJSON.map(normalizeIngredients);
const saucesTypes = saucesJSON.map(normalizeSauces);
const sizesTypes = sizesJSON.map(normalizeSizes);
</script>

<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <DoughSelect :dough-types="doughTypes" />
        <SizesSelect :sizes-types="sizesTypes" />

        <IngredientsSelect
          :ingredients-types="ingredientsTypes"
          :sauces-types="saucesTypes"
        />
        <Pizza />
      </div>
    </form>
  </main>
</template>
