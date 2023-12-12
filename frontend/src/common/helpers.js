import doughSizes from "./data/doughSizes"
import ingredients from "./data/ingredients"
import sizes from "./data/sizes"
import sauces from "./data/sauces"

export const normalizeDough = (dough) => {
    return {
        ...dough,
        value: doughSizes[dough.id]
    }
}

export const normalizeSizes = (size) => {
    return {
        ...size,
        value: sizes[size.id]
    }
}

export const normalizeIngredients = (ingredient) => {
    return {
        ...ingredient,
        value: ingredients[ingredient.id]
    }
}

export const normalizeSauces = (sauce) => {
    return {
        ...sauce,
        value: sauces[sauce.id]
    }
}