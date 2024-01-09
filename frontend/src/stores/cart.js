import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";

export const useCartStore = defineStore("cart", {
  state: () => ({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    miscs: [],
  }),
  getters: {
    getAllPizzaPrices: (state) => {
      return state.pizzas.reduce(
        (sum, pizza) => sum + pizza.pricePizza * pizza.count,
        0
      );
    },

    getPizzaCount: (state) => (id) => {
      return state.pizzas[id] ? state.pizzas[id].count : 0;
    },

    getAllMiscsPrices: (state) => {
      const data = useDataStore();
      return state.miscs.reduce((sum, misc) => {
        if (misc !== undefined) {
          const dataMisc = data.misc.find(
            (data_misc) => data_misc !== undefined && data_misc.id === misc.id
          );
          if (dataMisc) {
            return sum + dataMisc.price * misc.count;
          }
        }
        return sum;
      }, 0);
    },

    getMiscCount: (state) => (id) => {
      return state.miscs[id] ? state.miscs[id].count : 0;
    },

    getFullPrice: (state) => {
      return state.getAllMiscsPrices + state.getAllPizzaPrices;
    },
  },
  actions: {
    incrementPizza(pizza) {
      this.pizzas[pizza].count++;
    },
    decrementPizza(pizza) {
      if (this.pizzas[pizza].count >= 2) {
        this.pizzas[pizza].count--;
      } else {
        this.pizzas.splice(pizza, 1);
      }
    },
    incrementMisc(misc) {
      try {
        this.miscs[misc.id].count++;
      } catch (error) {
        const misc_val = { ...misc };
        misc_val["count"] = 1;
        this.miscs[misc.id] = misc_val;
      }
    },
    decrementMisc(misc) {
      this.miscs[misc.id].count--;
    },
    addPizza(pizza) {
      this.pizzas.push(pizza);
    },
    editPizza(pizza) {
      this.pizzas[pizza.id] = pizza;
    },
    copyCart(order) {
      order.pizzas.forEach((pizza) => this.addPizza({ ...pizza }));
      order.miscs.forEach((misc) => (this.miscs[misc.id] = { ...misc }));
    },
    reset() {
      this.phone = "";
      this.address = {
        street: "",
        building: "",
        flat: "",
        comment: "",
      };
      this.pizzas = [];
      this.miscs = [];
    },
  },
});
