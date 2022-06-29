export interface MenuItem {
  text: string,
  image: string,
  id: number
  selected?: boolean
}

export type WeekListResponse = { date: string, id: number, menuId: number }[]

export interface WeekMenusListResponse {
  menu: MenuItem[]
  sauces: MenuItem[]
}

export interface SelectedMenuItem {
  weekId: number
  selectedItem?: number
  selectedSauce?: number
}

export type SelectedMeals = SelectedMenuItem[]
