import { defineStore } from "pinia";
import { pizzaPrice } from "@/common/pizza-price";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: null,
    name: "",
    sauce: useDataStore().sauces[0],
    dough: useDataStore().doughs[0],
    size: useDataStore().sizes[0],
    ingredients: {},
  }),
  getters: {
    getSauce: (state) => {
      const data = useDataStore();
      return (
        data.sauces.find((item) => item.id === state.sauce.id) ?? data.sauces[0]
      );
    },
    getSize: (state) => {
      const data = useDataStore();
      return (
        data.sizes.find((item) => item.id === state.size.id) ?? data.sizes[0]
      );
    },
    getDough: (state) => {
      const data = useDataStore();
      return (
        data.doughs.find((item) => item.id === state.dough.id) ?? data.doughs[0]
      );
    },
    pricePizza: (state) => {
      return pizzaPrice(state);
    },
    ingredientsString: (state) => {
      return Object.values(state.ingredients)
        .filter((ingredient) => ingredient.count > 0)
        .map((ingredient) => `${ingredient.name} X ${ingredient.count}`)
        .join(", ");
    },
  },
  actions: {
    incrementIngredient(ingredient) {
      try {
        this.ingredients[ingredient.latinName].count++;
      } catch (error) {
        const ingredient_val = { ...ingredient };
        ingredient_val["count"] = 1;
        this.ingredients[ingredient.latinName] = ingredient_val;
      }
    },
    ingredientsStringForPizza: (ingredients) => {
      const data = useDataStore()
      if (ingredients !== []){
        return ingredients
        .filter((ingredient) => ingredient.quantity > 0)
        .map(
          (ingredient) =>
            `${
              data.ingredients.find(
                (item) => item.id === ingredient.ingredientId
              ).name
            } X ${ingredient.quantity}`
        )
        .join(", ");
      } else {return ''}

    },
    decrementIngredient(ingredient) {
      this.ingredients[ingredient.latinName].count--;
    },
    getIngredientCount(ingredient) {
      return this.ingredients[ingredient.latinName]
        ? this.ingredients[ingredient.latinName].count
        : 0;
    },
    changeSauce(sauce) {
      this.sauce = sauce;
    },
    changeSize(size) {
      this.size = size;
    },
    changeDough(dough) {
      this.dough = dough;
    },
    pricePizzaSome(pizza){
      const data = useDataStore()
      return pizzaPrice({
        size: data.sizes.find((item) => item.id === pizza.sizeId),
        sauce: data.sauces.find((item) => item.id === pizza.sauceId),
        dough: data.doughs.find((item) => item.id === pizza.doughId),
        ingredients: pizza.ingredients ? pizza.ingredients.map((item) => ({count: item.quantity, price: data.ingredients.find((ingr)=>ingr.id === item.ingredientId).price})) : []
      });
    },
    copyPizzaForEdit(pizza) {
      this.size = pizza.size;
      this.dough = pizza.dough;
      this.sauce = pizza.sauce;
      this.name = pizza.name;
      this.id = pizza.id;
      this.count = pizza.count;
      this.ingredients = { ...pizza.ingredients };
    },
    reset() {
      this.id = null;
      this.name = "";
      this.sauce = useDataStore().sauces[0];
      this.dough = useDataStore().doughs[0];
      this.size = useDataStore().sizes[0];
      this.ingredients = {

      };
    },
  },
});
