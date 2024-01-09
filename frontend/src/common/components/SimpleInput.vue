<template>
  <label class="input">
    <span class="visually-hidden">{{ hiddenSpan }}</span>
    <input
      :type=type
      :name=inputName
      :placeholder=placeholder
    />
  </label>
</template>

<script setup>
    defineProps({
        placeholder: { type: String, default: ''},
        type: { type: String, default: ''},
        inputName: { type: String, default: ''},
        hiddenSpan: { type: String, default: ''}
    });
</script>