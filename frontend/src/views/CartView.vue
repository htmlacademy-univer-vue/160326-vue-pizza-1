<template>
  <form class="layout-form" @submit.prevent="makeOrder">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="cart.pizzas.length === 0" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="(cart_pizza, index) in cart.pizzas"
            :key="index"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <img
                src="http://127.0.0.1:3000/public/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="{{ cart_pizza.name }}"
              />
              <div class="product__text">
                <h2>{{ cart_pizza.name }}</h2>
                <ul>
                  <li>
                    {{ cart_pizza.getSize.name }}, на
                    {{ cart_pizza.getDough.name.toLowerCase().slice(0, -1) }}м
                    тесте
                  </li>
                  <li>Соус: {{ cart_pizza.getSauce.name }}</li>
                  <li>Начинка: {{ cart_pizza.ingredientsString }}</li>
                </ul>
              </div>
            </div>
            <app-counter
              class="cart-list__counter"
              :color="'orange'"
              :max="5"
              :value="cart.getPizzaCount(index)"
              @increment-counter="cart.incrementPizza(index)"
              @decrement-counter="cart.decrementPizza(index)"
            ></app-counter>

            <div class="cart-list__price">
                <b><span v-if="cart_pizza.count>1">{{cart_pizza.count}} X </span>{{ cart_pizza.pricePizza }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                type="button"
                class="cart-list__edit"
                @click="changePizza(cart_pizza)"
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>
        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="(item, index) in data.misc"
              :key="index"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="`http://127.0.0.1:3000${item.image}`"
                  width="39"
                  height="60"
                  :alt="item.name"
                />
                <span>{{ item.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <app-counter
                  class="additional-list__counter"
                  :color="'orange'"
                  :max="5"
                  :value="cart.getMiscCount(item.id)"
                  @increment-counter="cart.incrementMisc(item)"
                  @decrement-counter="cart.decrementMisc(item)"
                ></app-counter>

                <div class="additional-list__price">
                  <b>× {{ item.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select v-model="selectedAddressId" name="test" class="select">
                <option value="-1">Заберу сам</option>
                <option value="-2">Новый адрес</option>
                <option
                  v-for="(address, index) in profile.addresses"
                  :key="index"
                  :value="address.id"
                >
                  {{ address.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="orderPhone"
                type="text"
                name="tel"
                placeholder="Введите телефон"
              />
            </label>

            <div v-if="selectedAddressId === '-2'" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input
                    v-model="newAddress.street"
                    type="text"
                    name="street"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input
                    v-model="newAddress.building"
                    type="text"
                    name="house"
                    required
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира*</span>
                  <input
                    v-model="newAddress.flat"
                    type="text"
                    name="apartment"
                    required
                  />
                </label>
              </div>
            </div>
            <div
              v-if="selectedAddressId !== '-2' && selectedAddressId !== '-1'"
              class="cart-form__address"
            >
              <span class="cart-form__label">Aдрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица</span>
                  <input
                    type="text"
                    name="street"
                    disabled
                    :value="selectedAddress.street"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом</span>
                  <input
                    type="text"
                    name="house"
                    disabled
                    :value="selectedAddress.building"
                  />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input
                    type="text"
                    name="apartment"
                    disabled
                    :value="selectedAddress.flat"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link
          :to="{ name: 'HomeView' }"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cart.getFullPrice }} ₽</b>
      </div>

      <div v-if="authStore.user !== null" class="footer__submit">
        <button
          :disabled="cart.getFullPrice === 0"
          type="submit"
          class="button"
        >
          Оформить заказ
        </button>
      </div>
      <div v-else class="footer__login">
        <div class="footer__more">
          <router-link
            class="button"
            :to="{ name: 'LoginView', query: { redirect: '/cart' } }"
          >
            Авторизируйтесь
          </router-link>
        </div>
        <p class="footer__text">
          Совершить заказ могут только<br />авторизированные пользователи
        </p>
      </div>
    </section>
  </form>
</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import { useCartStore } from "@/stores/cart";
import { useDataStore } from "@/stores/data";
import { useProfileStore } from "@/stores/profile";
import { ref, watch } from "vue";
import router from "@/router";
import { usePizzaStore } from "@/stores/pizza";
import { useAuthStore } from "@/stores/auth";

const cart = useCartStore();
const data = useDataStore();
const profile = useProfileStore();
const pizza = usePizzaStore();
const authStore = useAuthStore();

const selectedAddressId = ref("-1");
const selectedAddress = ref(null);
const newAddress = ref({});
const orderPhone = ref(profile.phone);

watch(selectedAddressId, (newAddressId) => {
  if (newAddressId >= 0) {
    selectedAddress.value = profile.addresses.find(
      (address) => address.id === newAddressId
    );
  } else {
    selectedAddress.value = null;
  }
});

function makeOrder() {
  if (!authStore.isAuthenticated) {
    router.push("/login?redirect=/cart");
  } else {
    const newOrder = {
      userId: authStore.user.id,
      phone: orderPhone.value,
      misc: cart.miscs.filter((item)=>item.count>0).map(item => ({ miscId: item.id, quantity: item.count })),
      pizzas: cart.pizzas.map(item => ({ ingredients: Object.entries(item.ingredients).map(([name, { id, count }]) => ({ ingredientId: id, quantity: count })), quantity: item.count, name: item.name, sauceId: item.sauce.id, sizeId: item.size.id, doughId: item.dough.id })),
      address: {
          building: " ",
          flat: " ",
          street: " ",
          comment: " ",
      }
    };
    console.log(newOrder)
    if (selectedAddressId.value >= 0) {
      newOrder["address"] = profile.addresses.find(
        (address) => address.id === selectedAddressId.value
      );
    }
    if (selectedAddressId.value === "-2") {
      newOrder["address"]["building"] = newAddress.value.building;
      newOrder["address"]["flat"] = newAddress.value.flat;
      newOrder["address"]["street"] = newAddress.value.street;
      newOrder["address"]["comment"] = "";
    }
    profile.makeOrder(newOrder);
    cart.reset();
    router.push("/success");
  }
}

function changePizza(pizza_change) {
  pizza.copyPizzaForEdit({ ...pizza_change });
  router.push("/");
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

@import "@/assets/scss/layout/layout-form.scss";
@import "@/assets/scss/blocks/cart.scss";
@import "@/assets/scss/mixins/m_clear-list.scss";
@import "@/assets/scss/visually-hidden.scss";

@import "@/assets/scss/blocks/cart-list.scss";
@import "@/assets/scss/blocks/cart-form.scss";
@import "@/assets/scss/blocks/product.scss";
@import "@/assets/scss/blocks/additional-list.scss";
@import "@/assets/scss/blocks/footer.scss";
@import "@/assets/scss/blocks/select.scss";
</style>
