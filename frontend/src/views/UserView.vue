<template>
  <div class="layout__title">
    <h1 class="title title--big">Мои данные</h1>
  </div>

  <div class="user">
    <picture>
      <source
        type="image/webp"
        srcset="
          @/assets/img/users/user5@2x.webp 1x,
          @/assets/img/users/user5@4x.webp 2x
        "
      />
      <img
        src="http://127.0.0.1:3000/public/img/users/user5@2x.jpg"
        srcset="http://127.0.0.1:3000/public/img/users/user5@4x.jpg"
        :alt="user.name"
        width="72"
        height="72"
      />
    </picture>
    <div class="user__name">
      <span>{{ user.name }}</span>
    </div>
    <p class="user__phone">
      Контактный телефон: <span>{{ user.phone }}</span>
    </p>
  </div>
  <div
    v-for="(address, index) in user.addresses"
    :key="index"
    class="layout__address"
  >
    <address-form
      v-if="selectedAddress !== null && selectedAddress.id === address.id"
      :model-value="selectedAddress"
      :type="1"
      @delete-form="deleteAddress"
      @cancel-form="cancelForm"
      @submit-form="saveForm"
    ></address-form>
    <div v-else class="sheet address-form">
      <div class="address-form__header">
        <b>Адрес №{{ index + 1 }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button type="button" class="icon" @click="editAddress(address)">
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>
        ул. {{ address.street }}, д. {{ address.building }}, кв.
        {{ address.flat }}
      </p>
      <small>{{ address.comment }}</small>
    </div>
  </div>

  <div v-if="addForm" class="layout__address">
    <address-form
      v-if="addForm"
      :model-value="newAddress"
      :type="2"
      @cancel-form="resetForm"
      @submit-form="saveForm"
    ></address-form>
  </div>

  <div class="layout__button">
    <button type="button" class="button button--border" @click="addForm = true">
      Добавить новый адрес
    </button>
  </div>
</template>
<script setup>
import { useProfileStore } from "@/stores/profile";
import { ref } from "vue";
import { useDataStore } from "@/stores/data";
import AddressForm from "@/modules/forms/AddressForm.vue";

const user = useProfileStore();
const data = useDataStore();
const addForm = ref(false);
const selectedAddress = ref(null);
const newAddress = ref({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
});

const resetForm = () => {
  newAddress.value = {
    name: "",
    street: "",
    building: "",
    flat: "",
    comment: "",
  };
  addForm.value = false;
};

const cancelForm = () => {
  selectedAddress.value = null;
};

const editAddress = (address) => {
  selectedAddress.value = { ...address };
};

const saveForm = () => {
  if (selectedAddress.value) {
    user.editAddress({ ...selectedAddress.value });
    cancelForm();
  } else {
    user.addAddress({ ...newAddress.value });
    resetForm();
  }
};

const deleteAddress = () => {
  user.deleteAddress(selectedAddress.value);
  cancelForm();
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/layout/layout.scss";

@import "@/assets/scss/blocks/user.scss";
@import "@/assets/scss/blocks/icon.scss";
@import "@/assets/scss/blocks/address-form.scss";
</style>
