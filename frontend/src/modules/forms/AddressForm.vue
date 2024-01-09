<template>
  <form class="address-form address-form--opened sheet">
    <div class="address-form__header">
      <b>{{ props.type === 1 ? "Редактировать адрес" : "Новый адрес" }}</b>
    </div>

    <div class="address-form__wrapper">
      <div class="address-form__input">
        <label class="input">
          <span>Название адреса{{ props.type === 1 ? "" : "*" }}</span>
          <input
            v-model="props.modelValue.name"
            type="text"
            name="addr-name"
            placeholder="Введите название адреса"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--normal">
        <label class="input">
          <span>Улица{{ props.type === 1 ? "" : "*" }}</span>
          <input
            v-model="props.modelValue.street"
            type="text"
            name="addr-street"
            placeholder="Введите название улицы"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Дом{{ props.type === 1 ? "" : "*" }}</span>
          <input
            v-model="props.modelValue.building"
            type="text"
            name="addr-house"
            placeholder="Введите номер дома"
            required
          />
        </label>
      </div>
      <div class="address-form__input address-form__input--size--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="props.modelValue.flat"
            type="text"
            name="addr-apartment"
            placeholder="Введите № квартиры"
          />
        </label>
      </div>
      <div class="address-form__input">
        <label class="input">
          <span>Комментарий</span>
          <input
            v-model="props.modelValue.comment"
            type="text"
            name="addr-comment"
            placeholder="Введите комментарий"
          />
        </label>
      </div>
    </div>

    <div class="address-form__buttons">
      <button
        v-if="props.type === 1"
        type="button"
        class="button button--border"
        @click="deleteAddress"
      >
        Удалить
      </button>
      <button
        type="button"
        class="button button--transparent"
        @click="cancelAddress"
      >
        Отмена
      </button>
      <button type="button" class="button" @click="submitAddress">
        {{ props.type === 1 ? "Сохранить" : "Добавить" }}
      </button>
    </div>
  </form>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
    required: true,
  },
  type: {
    type: Number,
    default: 1,
    required: true,
  },
});

const emit = defineEmits(["deleteForm", "cancelForm", "submitForm"]);
const deleteAddress = () => {
  emit("deleteForm");
};

const cancelAddress = () => {
  emit("cancelForm");
};

const submitAddress = () => {
  emit("submitForm");
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/layout/layout.scss";

@import "@/assets/scss/blocks/address-form.scss";
</style>
