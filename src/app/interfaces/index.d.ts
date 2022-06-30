export interface User {
  id: number
  name: string
}

export interface Selection {
  userId: number
  weekId: number
  mealId?: number
  sauceId?: number
}

export interface Week {
  id: number
  text: string
  menuId: number
}

export interface Meal {
  text: string
  details?: string
  image: string
  id: number
  selected?: boolean
}

export type Sauce = Meal

export interface Menu {
  id: number
  name: string
  meals: Meal[]
  sauces?: Sauce[]
}

export interface MenuItem {
  text: string,
  image: string,
  id: number
  selected?: boolean
}

export interface SelectedMenuItem {
  weekId: number
  selectedItem?: number
  selectedSauce?: number
}

export type SelectedMeals = SelectedMenuItem[]
