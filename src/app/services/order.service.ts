import { Injectable, OnDestroy } from '@angular/core'
import { SelectedMeals } from '../interfaces/responses'
import { BehaviorSubject, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {

  selectedMeals = new BehaviorSubject<SelectedMeals>([])
  selectedMealSubscription: Subscription | null = null

  constructor () {
    let storedSelectedMeals = localStorage.getItem('selectedMeals')
    if (storedSelectedMeals !== null) {
      this.selectedMeals.next(JSON.parse(storedSelectedMeals))
    }
    this.selectedMealSubscription = this.selectedMeals.subscribe(
      (selectedMeals) => {
        console.log(selectedMeals[0])
        this.saveSelectedMeals(selectedMeals)
      }
    )
  }

  saveSelectedMeals (selectedMeals: SelectedMeals) {
    localStorage.setItem('selectedMeals', JSON.stringify(selectedMeals))
  }

  selectMeal (weekId: number, itemId: number, sauce: boolean = false) {
    let oldList = this.selectedMeals.value
    if (oldList.some((selectedItem) => selectedItem.weekId === weekId)) {
      oldList = oldList.map((selectedItem) => {
        if (selectedItem.weekId === weekId) {
          return {
            ...selectedItem, ...(sauce ? { selectedSauce: itemId } : { selectedItem: itemId })
          }
        } else {
          return selectedItem
        }
      })
    } else {
      oldList.push(sauce ? { selectedSauce: itemId, weekId } : { selectedItem: itemId, weekId })
    }
    this.selectedMeals.next(oldList)
  }

  ngOnDestroy () {
    if (this.selectedMealSubscription !== null) {
      this.selectedMealSubscription.unsubscribe()
    }
  }

}
