import { defineStore } from "pinia";
import daughJson from "@/mocks/dough.json";
import ingredientsJson from "@/mocks/ingredients.json";
import saucesJson from "@/mocks/sauces.json";
import sizesJson from "@/mocks/sizes.json";
import miscJson from "@/mocks/misc.json";
import addresseseJson from "@/mocks/addresses.json";

import {
  doughNormalize,
  sizeNormalize,
  ingredientNormalize,
  sauceNormalize,
} from "@/common/helpers";
import { useProfileStore } from "@/stores/profile";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: daughJson.map(doughNormalize),
    ingredients: ingredientsJson.map(ingredientNormalize),
    sauces: saucesJson.map(sauceNormalize),
    sizes: sizesJson.map(sizeNormalize),
    misc: miscJson,
    addresses: addresseseJson,
  }),
  getters: {},
  actions: {
    addAddress(address) {
      const sortedAddresses = this.addresses.sort((a, b) => a.id - b.id);
      const lastId = sortedAddresses[sortedAddresses.length - 1].id;
      const user = useProfileStore();
      const addressToAdd = {
        id: lastId + 1,
        name: address.name,
        street: address.street,
        building: address.building,
        flat: address.flat,
        comment: address.comment,
        userId: user.id,
      };

      this.addresses.push(addressToAdd);
    },
    editAddress(address) {
      const index = this.addresses.findIndex((a) => a.id === address.id);
      this.addresses[index] = { ...address };
    },
    deleteAddress(address) {
      this.addresses = this.addresses.filter(
        (address_this) => address_this.id !== address.id
      );
    },
  },
});
