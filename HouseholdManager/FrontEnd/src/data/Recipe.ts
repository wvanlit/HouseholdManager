export interface RecipeList {
  id: number
  householdId: number
  name: string
  recipes: Recipe[]
}

export interface Recipe {
  name: string
  recipeLink?: string
  ingredients: RecipeIngredient[]
}

export interface RecipeIngredient {
  id: number
  name: string
  amount: string
  price: number
}
