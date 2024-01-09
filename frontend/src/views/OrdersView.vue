<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section
    v-for="(order, index) in profile.orders"
    :key="index"
    class="sheet order"
  >
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ profile.getOrderPrice(order) }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="profile.deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button" @click="copyOrder(order)">
          Повторить
        </button>
      </div>
    </div>
    <ul class="order__list">
      <li
        v-for="(pizza, index) in order.orderPizzas"
        :key="index"
        class="order__item"
      >
        <div class="product">
          <img
            src="http://127.0.0.1:3000/public/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>
                {{
                  dataStore.sizes.find((item) => item.id === pizza.sizeId).name
                }}, на
                {{
                  dataStore.doughs
                    .find((item) => item.id === pizza.doughId)
                    .name.toLowerCase()
                    .slice(0, -1)
                }}м тесте
              </li>
              <li>
                Соус:
                {{
                  dataStore.sauces.find((item) => item.id === pizza.sauceId)
                    .name
                }}
              </li>
                            <li v-if="pizza.ingredients !== undefined && pizzaStore.ingredientsStringForPizza(pizza.ingredients).length > 0">
                              Начинка: {{ pizzaStore.ingredientsStringForPizza(pizza.ingredients) }}
                            </li>
            </ul>
          </div>
        </div>
        <p class="order__price">
                    <span v-if="pizza.quantity > 1">{{ pizza.quantity }} X </span
                    >{{ pizzaStore.pricePizzaSome(pizza) }} ₽
        </p>
      </li>
    </ul>
    <ul v-if="order.orderMisc !== undefined" class="order__additional">
      <li v-for="(misc, index) in order.orderMisc" :key="index">
                <img
                  :src="`http://127.0.0.1:3000${
                    dataStore.misc.find((item) => item.id === misc.miscId).image
                  }`"
                  width="20"
                  height="30"
                  :alt="dataStore.misc.find((item)=>item.id===misc.miscId).name"
                />
        <p>
                    <span>{{ dataStore.misc.find((item)=>item.id===misc.miscId).name }}</span>
                    <b
                      ><span v-if="misc.quantity > 1">{{ misc.quantity }} X </span
                      >{{ dataStore.misc.find((item)=>item.id===misc.miscId).price }} ₽</b
                    >
        </p>
      </li>
    </ul>
    <p
      v-if="profile.getOrderAdress(order).street !== ' '"
      class="order__address"
    >
      Адрес доставки:
      <span v-if="profile.getOrderAdress(order).name">{{
        profile.getOrderAdress(order).name
      }}</span>
      <span v-else
        >Улица {{ profile.getOrderAdress(order).street }}, д.{{
          profile.getOrderAdress(order).building
        }}, кв.{{ profile.getOrderAdress(order).flat }}</span
      >
    </p>
    <p v-else class="order__address">Самовывоз</p>
  </section>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
import { useCartStore } from "@/stores/cart";
import router from "@/router";
import { usePizzaStore } from "@/stores/pizza";
import { useDataStore } from "@/stores/data";

const profile = useProfileStore();
const pizzaStore = usePizzaStore();
const dataStore = useDataStore();
const cart = useCartStore();

const copyOrder = (order) => {
  cart.copyCart(order);
  router.push("/cart");
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/m_clear-list.scss";
@import "@/assets/scss/layout/layout.scss";

@import "@/assets/scss/blocks/order.scss";
@import "@/assets/scss/blocks/product.scss";
</style>
