<template>
  <div class="sign-form__input">
    <label class="input">
      <span>{{ labelName }}</span>
      <input
        :value="modelValue"
        :type="type"
        :name="name"
        :class="{ 'error-input': showError }"
        :placeholder="placeholder"
        :required="required"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <span v-if="showError" class="error">
        {{ errorText }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  labelName: {
    type: String,
    default: null,
  },
  modelValue: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorText: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const showError = computed(() => {
  return props.errorText !== "";
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds-colors.scss";

.error {
  text-align: center;
  color: $red-800;
  margin-top: 10px;
}

.error-input {
  border-color: $red-800;
}
</style>
