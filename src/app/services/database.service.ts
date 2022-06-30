import { Injectable } from '@angular/core'
import { Menu, Selection, User, Week } from '../interfaces'

// Import defaults from JSON
import users from '../fake-data/users.json'
import menus from '../fake-data/menus.json'
import weeks from '../fake-data/weeks.json'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  users: User[] = []
  selections: Selection[] = []
  menus: Menu[] = []
  weeks: Week[] = []
  selectedUser: User | null = null

  constructor () {
    // set default or read saved data
    const meta = localStorage.getItem('LunchMeta')
    if (meta === null) {
      this.saveDefaultsToLocalStorage()
      localStorage.setItem('LunchMeta', 'meta')
    }

    this.readFromLocalStorage()
  }

  private readFromLocalStorage () {
    const usersString = localStorage.getItem('users')
    if (usersString !== null) {
      this.users = JSON.parse(usersString)
    }

    const menusString = localStorage.getItem('menus')
    if (menusString !== null) {
      this.menus = JSON.parse(menusString)
    }

    const weeksString = localStorage.getItem('weeks')
    if (weeksString !== null) {
      this.weeks = JSON.parse(weeksString)
    }

    const selectionsString = localStorage.getItem('selections')
    if (selectionsString !== null) {
      this.selections = JSON.parse(selectionsString)
    }
  }

  private saveDefaultsToLocalStorage () {
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('menus', JSON.stringify(menus))
    localStorage.setItem('weeks', JSON.stringify(weeks))
    localStorage.setItem('selections', JSON.stringify([]))
  }

  getWeeks () {
    return this.weeks
  }

  getMenu (menuId: number, userId: number, weekId: number): Menu | null {
    const selection = this.getSelection(userId, weekId)

    let menu = this.menus.find((menu) => menu.id === menuId) ?? null

    // DEEP COPY !!!!!!!!!! or manually false everything
    // menu = JSON.parse(JSON.stringify(menu))

    if (menu !== null) {
      if (selection !== null) {
        if (selection.mealId !== undefined) {
          menu.meals = menu.meals.map((meal) => {
            if (meal.id === selection.mealId) {
              meal.selected = true
            } else {
              meal.selected = false
            }
            return meal
          })
        }
        if (menu.sauces !== undefined && selection.sauceId !== undefined) {
          menu.sauces = menu.sauces.map((sauce) => {
            if (sauce.id === selection.sauceId) {
              sauce.selected = true
            } else {
              sauce.selected = false
            }
            return sauce
          })
        }
      } else {
        menu.meals = menu.meals.map(meal => {
          meal.selected = false
          return meal
        })
        if (menu.sauces !== undefined) {
          menu.sauces = menu.sauces.map(sauce => {
            sauce.selected = false
            return sauce
          })
        }
      }
    }
    return menu
  }

  getSelection (userId: number, weekId: number): Selection | null {
    return this.selections.find(
      (selection) => selection.weekId === weekId && selection.userId === userId
    ) ?? null
  }

  selectMeal (userId: number, weekId: number, mealId: number) {
    if (this.selections.some((selection) => selection.weekId === weekId && selection.userId === userId)) {
      this.selections.map((selection) => {
        if (selection.weekId === weekId && selection.userId === userId) {
          if (selection.mealId === mealId) {
            delete selection.mealId
          } else {
            selection.mealId = mealId
          }
        }
        return selection
      })
    } else {
      this.selections.push({ mealId: mealId, weekId: weekId, userId: userId })
    }
    this.saveSelection()
  }

  selectSauce (userId: number, weekId: number, sauceId: number) {
    if (this.selections.some((selection) => selection.weekId === weekId && selection.userId === userId)) {
      this.selections.map((selection) => {
        if (selection.weekId === weekId && selection.userId === userId) {
          if (selection.sauceId === sauceId) {
            delete selection.sauceId
          } else {
            selection.sauceId = sauceId
          }
        }
        return selection
      })
    } else {
      this.selections.push({ sauceId: sauceId, weekId: weekId, userId: userId })
    }
    this.saveSelection()
  }

  private saveSelection () {
    localStorage.setItem('selections', JSON.stringify(this.selections))
  }

  getUsers () {
    return this.users
  }

  selectUser (userId: number) {
    this.selectedUser = this.getUsers().find((user) => user.id === userId) ?? null
    localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser))
  }

  getSelectedUser (): User | null {
    return this.selectedUser
  }
}
