

export enum MealType {
  Breakfast = 'Breakfast',
  Lunch = 'Lunch',
  Dinner = 'Dinner',
  Snack = 'Snack',
}

export enum DietType {
  Vegetarian = 'Vegetarian',
  Vegan = 'Vegan',
  GlutenFree = 'GlutenFree',
  Keto = 'Keto',
  Paleo = 'Paleo',
  None = 'None',
}
export const MEAL_TYPES: MealType[] = [
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Snack,
  MealType.Dinner,
];
export const DIET_TYPES: DietType[] = [
  DietType.Vegetarian,
  DietType.Vegan,
  DietType.GlutenFree,
  DietType.Keto,
  DietType.Paleo,
  DietType.None,
];