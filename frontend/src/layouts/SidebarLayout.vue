<template>
    <div class="layout__sidebar sidebar">
      <router-link :to="{name: 'HomeView'}" class="logo layout__logo">
        <img
          src="@/assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
      <router-link :to="{name: 'OrdersView'}"  class="layout__link">
        История заказов
      </router-link>
      <router-link :to="{name: 'UserView'}"  class="layout__link">
        Мои данные
      </router-link>
<!--      <a class="layout__link" href="#">История заказов</a>-->
<!--      <a class="layout__link layout__link&#45;&#45;active" href="#">Мои данные</a>-->
    </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

@import "@/assets/scss/layout/sidebar.scss";
@import "@/assets/scss/layout/layout.scss";
@import "@/assets/scss/blocks/logo.scss";
</style>