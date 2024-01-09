<script setup>
const props = defineProps({
  sizesTypes: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          class="diameter__input"
          :class="`diameter__input--${sizeType.value}`"
          v-for="sizeType in sizesTypes"
          :key="sizeType.id"
        >
          <input
            type="radio"
            name="diameter"
            :value="sizeType.value"
            class="visually-hidden"
          />
          <span>{{ sizeType.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
