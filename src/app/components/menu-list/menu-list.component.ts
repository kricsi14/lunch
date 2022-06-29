import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { MenuItem, WeekMenusListResponse } from '../../interfaces/responses'
import { ActivatedRoute } from '@angular/router'
import { OrderService } from '../../services/order.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  restaurant: WeekMenusListResponse | null = null
  selectedMealSubscription: Subscription | null = null

  constructor (private apiService: ApiService, private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit (): void {
    this.route.params.subscribe((params) => {
      this.restaurant = null
      this.apiService.getRestaurant(+params['weekId']).subscribe(
        (menu) => {
          if (menu!.menu) {
            menu!.menu = menu!.menu.map((menuItem) => {
              if (menuItem.selected === true) {
                return menuItem
              } else {
                menuItem.selected = false
                return menuItem
              }
            })
          }
          if (menu!.sauces) {
            menu!.sauces = menu!.sauces.map((menuItem) => {
              if (menuItem.selected === true) {
                return menuItem
              } else {
                menuItem.selected = false
                return menuItem
              }
            })
          }

          this.restaurant = menu
        }
      )
    })
  }

  orderItem (item: MenuItem, sauce: boolean = false) {
    if (this.restaurant!.menu && !sauce) {
      this.restaurant!.menu = this.restaurant!.menu.map((menuItem) => {
        if (menuItem.id === item.id) {
          menuItem.selected = true
          return menuItem
        } else {
          menuItem.selected = false
          return menuItem
        }
      })
    }
    if (this.restaurant!.sauces && sauce) {
      this.restaurant!.sauces = this.restaurant!.sauces.map((menuItem) => {
        if (menuItem.id === item.id) {
          menuItem.selected = true
          return menuItem
        } else {
          menuItem.selected = false
          return menuItem
        }
      })
    }
    this.orderService.selectMeal(this.route.snapshot.params['weekId'], item.id, sauce)
  }

}
