<template>
  <main class="content">
    <form action="#" method="post">
      <BigBlock>
        <template #title>Конструктор пиццы</template>
        <div class="content__dough">
          <SheetBlock :class-name="'dough'">
            <template #title>Выберите тесто</template>
            <label
              v-for="(dough, index) in doughs"
              :key="dough.id"
              class="dough__input"
              :class="'dough__input--' + doughName(dough)"
            >
              <input
                type="radio"
                name="dought"
                :value="doughName(dough)"
                class="visually-hidden"
                :checked="index === 0"
              />
              <b>{{ dough.name }}</b>
              <span>{{ dough.description }}</span>
            </label>
          </SheetBlock>
        </div>
        <div class="content__diameter">
          <SheetBlock :class-name="'diameter'">
            <template #title>Выберите размер</template>
            <label
              v-for="(size, index) in sizes"
              :key="size.id"
              class="diameter__input"
              :class="'diameter__input--' + sizeName(size)"
            >
              <input
                type="radio"
                name="diameter"
                :value="sizeName(size)"
                class="visually-hidden"
                :checked="index === 1"
              />
              <span>{{ size.name }}</span>
            </label>
          </SheetBlock>
        </div>
        <div class="content__ingredients">
          <SheetBlock :class-name="'ingredients'">
            <template #title>Выберите ингредиенты</template>
            <div class="ingredients__sauce">
              <p>Основной соус:</p>
              <label
                v-for="(sauce, index) in sauces"
                :key="sauce.id"
                class="radio ingredients__input"
              >
                <input
                  type="radio"
                  name="sauce"
                  :value="sauceName(sauce)"
                  :checked="index === 0"
                />
                <span>{{ sauce.name }}</span>
              </label>
            </div>
            <div class="ingredients__filling">
              <p>Начинка:</p>

              <ul class="ingredients__list">
                <li
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                  class="ingredients__item"
                >
                  <span
                    class="filling"
                    :class="'filling--' + ingredientName(ingredient)"
                    >{{ ingredient.name }}</span
                  >
                  <SimpleCounter />
                </li>
              </ul>
            </div>
          </SheetBlock>
        </div>
        <div class="content__pizza">
          <SimpleInput
            :hidden-span="String('Название пиццы')"
            :input-name="String('pizza_name')"
            :type="String('text')"
            :placeholder="String('Введите название пиццы')"
          />

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <GreenButton disabled> Готовьте! </GreenButton>
          </div>
        </div>
      </BigBlock>
    </form>
  </main>
</template>

<script setup>
import doughs from "../mocks/dough.json";
import sizes from "../mocks/sizes.json";
import ingredients from "../mocks/ingredients.json";
import sauces from "../mocks/sauces.json";

import {
  doughName,
  sizeName,
  ingredientName,
  sauceName,
} from "@/common/helpers";
import BigBlock from "@/common/components/BigBlock.vue";
import SheetBlock from "@/common/components/SheetBlock.vue";
import GreenButton from "@/common/components/GreenButton.vue";
import SimpleInput from "@/common/components/SimpleInput.vue";
import SimpleCounter from "@/common/components/SimpleCounter.vue";
</script>
