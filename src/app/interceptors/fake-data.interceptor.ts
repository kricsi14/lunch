import { Injectable } from '@angular/core'
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import weeks from '../fake-data/weeks.json'
import menus from '../fake-data/menus.json'
import { OrderService } from '../services/order.service'

@Injectable()
export class FakeDataInterceptor implements HttpInterceptor {

  constructor (private http: HttpClient, private orderService: OrderService) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Send fake weeks
    if (request.url === 'example.com/api/weeks' && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: weeks }))
    }
    // Send fake weekly menus
    if (request.url.match('example\\.com/api/weeks/\\d/menu') !== null && request.method === 'GET') {

      let selectedMeals = this.orderService.selectedMeals.value

      let menuId = weeks.find((week) => week.id.toString() === request.params.get('weekId'))?.menuId

      let restaurant = menus.find((menu) => {
        if (menuId) {
          return menu.id === menuId
        }
        return false
      })

      if (restaurant) {
        let week = selectedMeals.find((meal) => meal.weekId.toString() === request.params.get('weekId'))
        // there is selection to this week
        console.log(week, request.params.get('weekId'))
        if (week !== undefined) {
          if (restaurant.menu) {
            restaurant.menu = restaurant.menu.map((menuItem) => {
              if (menuItem.id === week!.selectedItem) {
                return { ...menuItem, selected: true }
              } else {
                return { ...menuItem, selected: false }
              }
            })
          }
          if (restaurant.sauces) {
            restaurant.sauces = restaurant.sauces.map((menuItem) => {
              if (menuItem.id === week!.selectedSauce) {
                return { ...menuItem, selected: true }
              } else {
                return { ...menuItem, selected: false }
              }
            })
          }
        } else {
          if (restaurant.menu) {
            restaurant.menu = restaurant.menu.map((menuItem) => {
              return { ...menuItem, selected: false }
            })
          }
          if (restaurant.sauces) {
            restaurant.sauces = restaurant.sauces.map((menuItem) => {
              return { ...menuItem, selected: false }
            })
          }
        }

        return of(new HttpResponse({ status: 200, body: { ...restaurant } }))
      }
    }
    return of(new HttpResponse({ status: 500, body: request.method }))
  }
}
