import { defineStore } from "pinia";
import { useDataStore } from "@/stores/data";
import {usePizzaStore} from "@/stores/pizza";

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
      const data = useDataStore()
      order.orderPizzas.forEach((pizza) => {
        const new_pizza = new usePizzaStore()
        new_pizza.id = this.pizzas.length
        new_pizza.count = pizza.quantity
        new_pizza.name = pizza.name
        new_pizza.dough = data.doughs.find((item)=>item.id === pizza.doughId)
        new_pizza.size = data.sizes.find((item)=>item.id === pizza.sizeId)
        new_pizza.sauce = data.sauces.find((item)=>item.id === pizza.sauceId)
        new_pizza.ingredients = pizza.ingredients.reduce((acc, ingredient) => {
  const foundIngredient = data.ingredients.find(item => item.id === ingredient.ingredientId);

  if (foundIngredient) {
    const latinName = foundIngredient.latinName;

    if (!acc[latinName]) {
      acc[latinName] = { ...foundIngredient, count: 0 };
    }

    acc[latinName].count += ingredient.quantity;
  }

  return acc;
}, {});
        this.addPizza({ ...new_pizza });
      });
order.orderMisc && order.orderMisc.forEach((misc) => {
  if (misc && misc.miscId !== undefined && misc.quantity !== undefined) {
    this.miscs[misc.miscId] = {
      ...data.misc.find((item) => item.id === misc.miscId),
      count: misc.quantity
    };
  }
});    },
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
