<template>
  <div class="layout__title">
    <h1 class="title title--big">История заказов</h1>
  </div>

  <section v-for="(order, index) in profile.orders" :key="index" class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ order.getFullPrice }} ₽</span>
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
      <li v-for="(pizza, index) in order.pizzas" :key="index" class="order__item">
        <div class="product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>
                {{ pizza.getSize.name }}, на
                {{ pizza.getDough.name.toLowerCase().slice(0, -1) }}м тесте
              </li>
              <li>Соус: {{ pizza.getSauce.name }}</li>
              <li v-if="pizza.ingredientsString.length > 0">
                Начинка: {{ pizza.ingredientsString }}
              </li>
            </ul>
          </div>
        </div>
        <p class="order__price">
          <span v-if="pizza.count > 1">{{ pizza.count }} X </span
          >{{ pizza.pricePizza }} ₽
        </p>
      </li>
    </ul>

    <ul class="order__additional">
      <li v-for="(misc, index) in order.miscs.filter((misc) => misc.count > 0)" :key="index">
        <img
          :src="`/src/assets/img/${misc.image}.svg`"
          width="20"
          height="30"
          :alt="misc.name"
        />
        <p>
          <span>{{ misc.name }}</span>
          <b
            ><span v-if="misc.count > 1">{{ misc.count }} X </span
            >{{ misc.price }} ₽</b
          >
        </p>
      </li>
    </ul>
    <p v-if="order.address" class="order__address">
      Адрес доставки:
      <span v-if="order.address.name">{{ order.address.name }}</span>
      <span v-else
        >Улица {{ order.address.street }}, д.{{ order.address.building }}, кв.{{
          order.address.flat
        }}</span
      >
    </p>
    <p v-else class="order__address">Самовывоз</p>
  </section>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile";
import { useCartStore } from "@/stores/cart";
import router from "@/router";

const profile = useProfileStore();
const cart = useCartStore();

const copyOrder = (order) => {
  cart.copyCart(order)
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
