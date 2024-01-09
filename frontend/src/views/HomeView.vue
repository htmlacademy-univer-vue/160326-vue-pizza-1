<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <choose-dough
                v-model="pizza.dough"
                :items="doughsList"
                @change-dough="changeDough"
              />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter">
              <choose-size
                v-model="pizza.size"
                :items="sizesList"
                @change-size="changeSize"
              />
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <choose-sauce
                  v-model="pizza.sauce"
                  :items="saucesList"
                  @change-sauce="changeSauce"
                />
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <add-ingredient
                    v-model="pizza.ingredients"
                    :items="ingredientsList"
                    @increment-ingredient="incrementIngredient"
                    @decrement-ingredient="decrementIngredient"
                  />
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizza.name"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            v-model="pizza"
            @drop="incrementIngredient"
          />

          <div class="content__result">
            <p v-text="'Итого: ' + totalPriceInfo + ' ₽'"></p>
            <button
              type="button"
              class="button"
              :disabled="isButtonDisabled"
              @click="printInfo"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import doughs from "../mocks/dough.json";
import sizes from "../mocks/sizes.json";
import ingredients from "../mocks/ingredients.json";
import sauces from "../mocks/sauces.json";

const doughsList = doughs.map((dough) => doughNormalize(dough));
const sizesList = sizes.map(sizeNormalize);
const ingredientsList = ingredients.map(ingredientNormalize);
const saucesList = sauces.map(sauceNormalize);

import {
  doughNormalize,
  ingredientNormalize,
  sauceNormalize,
  sizeNormalize,
} from "@/common/helpers";

import ChooseDough from "@/modules/constructor/ChooseDough.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import ChooseSize from "@/modules/constructor/ChooseSize.vue";
import ChooseSauce from "@/modules/constructor/ChooseSauce.vue";
import AddIngredient from "@/modules/constructor/AddIngredient.vue";
import { computed, reactive } from "vue";

const pizza = reactive({
  name: "",
  dough: doughsList[0],
  size: sizesList[0],
  sauce: saucesList[0],
  ingredients: ingredientsList.reduce((acc, ingredient) => {
    acc[ingredient.latinName] = 0;
    return acc;
  }, {}),
});

const changeDough = (dough) => {
  pizza.dough = dough;
};

const changeSize = (size) => {
  pizza.size = size;
};

const changeSauce = (sauce) => {
  pizza.sauce = sauce;
};

const incrementIngredient = (ingredient) => {
  pizza.ingredients[ingredient.latinName]++;
};

const decrementIngredient = (ingredient) => {
  pizza.ingredients[ingredient.latinName]--;
};

const isButtonDisabled = computed(() => {
  return pizza.name.length === 0;
});

function printInfo() {
  console.log("Pizza:", pizza);
}

const totalPriceInfo = computed(() => {
  const ingredientsPrice = Object.keys(pizza.ingredients).reduce(
    (total, ingredientName) => {
      const ingredient = ingredientsList.find(
        (item) => item.latinName === ingredientName
      );
      const ingredientCount = pizza.ingredients[ingredientName];
      const ingredientPrice = ingredient ? ingredient.price : 0;
      return total + ingredientPrice * ingredientCount;
    },
    0
  );
  return (
    pizza.size.multiplier *
    (pizza.dough.price + pizza.sauce.price + ingredientsPrice)
  );
});
</script>
