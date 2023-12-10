<script setup>
const props = defineProps({
  doughTypes: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="doughType in doughTypes"
          class="dough__input dough__input--light"
          :class="`dough__input--${doughType.value}`"
          :key="doughType.id"
        >
          <input
            type="radio"
            name="dought"
            :value="doughType.value"
            class="visually-hidden"
            checked
          />

          <b>{{ doughType.name }}</b>
          <span>{{ doughType.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
