import doughSizes from "./data/doughSizes";
import sauces from "./data/sauces";
import ingredients from "./data/ingredients";
import sizes from "./data/sizes";

export const doughNormalize = (dough) => {
  return {
    ...dough,
    latinName: doughSizes[dough.id],
  };
};

export const sizeNormalize = (size) => {
  return {
    ...size,
    latinName: sizes[size.id],
  };
};

export const ingredientNormalize = (ingredient) => {
  return {
    ...ingredient,
    latinName: ingredients[ingredient.id],
  };
};

export const sauceNormalize = (sauce) => {
  return {
    ...sauce,
    latinName: sauces[sauce.id],
  };
};
