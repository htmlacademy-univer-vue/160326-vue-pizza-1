<template>
  <main class="content">
    <form method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div class="sheet__content dough">
              <choose-dough v-model="pizza" :items="data.doughs" />
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div class="sheet__content diameter">
              <choose-size v-model="pizza" :items="data.sizes" />
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
                <choose-sauce v-model="pizza" :items="data.sauces" />
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <add-ingredient v-model="pizza" :items="data.ingredients" />
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
            @drop="pizza.incrementIngredient"
          />

          <div class="content__result">
            <p v-text="'Итого: ' + pizza.pricePizza + ' ₽'"></p>
            <button
              type="button"
              class="button"
              :disabled="pizza.name.length === 0"
              @click="addToCart"
            >
              {{ pizza.id !== null ? "Изменить" : "Готовьте!" }}
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import ChooseDough from "@/modules/constructor/ChooseDough.vue";
import PizzaConstructor from "@/modules/constructor/PizzaConstructor.vue";
import ChooseSize from "@/modules/constructor/ChooseSize.vue";
import ChooseSauce from "@/modules/constructor/ChooseSauce.vue";
import AddIngredient from "@/modules/constructor/AddIngredient.vue";
import { usePizzaStore } from "@/stores/pizza";
import { useDataStore } from "@/stores/data";
import { useCartStore } from "@/stores/cart";
import router from "@/router";
import { onUnmounted } from "vue";

const pizza = usePizzaStore();
const cart = useCartStore();
const data = useDataStore();

function addToCart() {
  const newPizza = { ...pizza };
  if (newPizza.id === null) {
    newPizza.id = cart.pizzas.length;
    newPizza.count = 1;
    pizza.reset();
    cart.addPizza(newPizza);
  } else {
    cart.editPizza(newPizza);
    pizza.reset();
  }
  router.push("/cart");
}
onUnmounted(() => {
  if (pizza.id !== null) {
    pizza.reset();
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/layout/content-home.scss";
@import "@/assets/scss/layout/main.scss";
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/mixins/m_clear-list.scss";
@import "@/assets/scss/blocks/ingredients.scss";
@import "@/assets/scss/blocks/filling.scss";
@import "@/assets/scss/visually-hidden.scss";
</style>
