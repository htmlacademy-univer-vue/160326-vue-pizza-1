<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="props.value === 0"
      @click="decrement()"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      disabled
      name="counter"
      class="counter__input"
      :value="props.value"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :class="`counter__button--` + props.color"
      :disabled="props.value === props.max"
      @click="increment()"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    default: 0,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["incrementCounter", "decrementCounter"]);
const increment = () => {
  if (props.value < props.max) {
    emit("incrementCounter");
  }
};

const decrement = () => {
  if (props.value > 0) {
    emit("decrementCounter");
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/m_center.scss";
@import "@/assets/scss/blocks/counter.scss";
</style>
