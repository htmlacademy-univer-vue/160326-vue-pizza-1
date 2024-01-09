import { defineStore } from "pinia";

import {
  doughNormalize,
  sizeNormalize,
  ingredientNormalize,
  sauceNormalize,
} from "@/common/helpers";
import resources from "@/services/resources";
import {usePizzaStore} from "@/stores/pizza";

export const useDataStore = defineStore("data", {
  state: () => ({
    doughs: [],
    ingredients: [],
    sauces: [],
    sizes: [],
    misc: [],
  }),
  getters: {},
  actions: {
    async fetchDoughs() {
      try {
        const doughs = await resources.dough.getDough();
        this.doughs = doughs.data.map(doughNormalize);
        const pizza = usePizzaStore();
        pizza.dough = this.doughs[0];
      } catch (error) {
        this.doughs = [];
        console.error("Error fetching doughs:", error);
      }
    },
    async fetchSizes() {
      try {
        const sizes = await resources.size.getSize();
        this.sizes = sizes.data.map(sizeNormalize);
        const pizza = usePizzaStore();
        pizza.size = this.sizes[0];
      } catch (error) {
        this.sizes = [];
        console.error("Error fetching sizes:", error);
      }
    },
    async fetchSauces() {
      try {
        const sauces = await resources.sauce.getSauce();
        this.sauces = sauces.data.map(sauceNormalize);
        const pizza = usePizzaStore();
        pizza.sauce = this.sauces[0];
      } catch (error) {
        this.sauces = [];
        console.error("Error fetching sauces:", error);
      }
    },
    async fetchMiscs() {
      try {
        const miscs = await resources.misc.getMisc();
        this.misc = miscs.data;
      } catch (error) {
        this.misc = [];
        console.error("Error fetching miscs:", error);
      }
    },
    async fetchIngredients() {
      try {
        const ingredients = await resources.ingredients.getIngredients();
        this.ingredients = ingredients.data.map(ingredientNormalize);
      } catch (error) {
        this.ingredients = [];
        console.error("Error fetching ingredients:", error);
      }
    },
  },
});
