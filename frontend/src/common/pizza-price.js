import { useDataStore } from "@/stores/data";

export const pizzaPrice = (pizza) => {
  const data = useDataStore();
  const ingredientsPrice = Object.values(pizza.ingredients).reduce(
    (total, ingredient) => total + ingredient.price * ingredient.count,
    0
  );

  const sizeMultiplier =
    data.sizes.find((item) => item === pizza.size)?.multiplier ?? 1;
  const doughPrice =
    data.doughs.find((item) => item === pizza.dough)?.price ?? 0;
  const saucePrice =
    data.sauces.find((item) => item === pizza.sauce)?.price ?? 0;
  return (doughPrice + saucePrice + ingredientsPrice) * sizeMultiplier;
};
