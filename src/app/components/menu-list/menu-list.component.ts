import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { Menu, MenuItem } from '../../interfaces'
import { ActivatedRoute } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {

  menu: Menu | null = null
  userId: number | null = null
  authSubscription: Subscription | null = null

  constructor (private apiService: ApiService, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit (): void {
    this.route.params.subscribe((params) => {
      this.menu = null
      if (this.userId !== null) {
        this.apiService.getRestaurant(+params['weekId'], this.userId).subscribe(
          (menu) => this.menu = menu
        )
      }
    })
    this.authSubscription = this.auth.signedIn.subscribe(user => {
      if (user !== null) {
        this.userId = user.id
        this.apiService.getRestaurant(this.route.snapshot.params['weekId'], this.userId).subscribe(
          (menu) => this.menu = menu
        )
      }
    })
  }

  orderItem (item: MenuItem, sauce: boolean = false) {
    if (this.userId !== null) {
      const weekId = parseInt(this.route.snapshot.params['weekId'])
      if (!sauce) {
        this.apiService.selectMeal(weekId, this.userId, item.id).subscribe(
          (result) => {
            if (result) {
              this.apiService.getRestaurant(weekId, this.userId!).subscribe(
                (menu) => this.menu = menu
              )
            }
          }
        )
      } else {
        this.apiService.selectSauce(parseInt(this.route.snapshot.params['weekId']), this.userId!, item.id).subscribe(
          (result) => {
            if (result) {
              this.apiService.getRestaurant(weekId, this.userId!).subscribe(
                (menu) => this.menu = menu
              )
            }
          }
        )
      }
    } else {
      alert('Select user!')
    }

  }

  ngOnDestroy () {
    if (this.authSubscription !== null) {
      this.authSubscription.unsubscribe()
    }
  }
}
