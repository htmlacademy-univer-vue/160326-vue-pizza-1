import doughSizes from "./data/doughSizes";
import sauces from "./data/sauces";
import ingredients from "./data/ingredients";
import sizes from "./data/sizes";

export const doughName = dough => {
  return doughSizes[dough.id];
};

export const sizeName = size => {
  return sizes[size.id];
};

export const ingredientName = ingredient => {
  return ingredients[ingredient.id];
};

export const sauceName = sauce => {
  return sauces[sauce.id];
};
