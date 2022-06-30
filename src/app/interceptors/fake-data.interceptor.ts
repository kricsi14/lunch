import { Injectable } from '@angular/core'
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { DatabaseService } from '../services/database.service'

@Injectable()
export class FakeDataInterceptor implements HttpInterceptor {

  constructor (private http: HttpClient, private databaseService: DatabaseService) {}

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const weekId = request.params.get('weekId')
    const userId = request.params.get('userId')
    const mealId = request.params.get('mealId')
    const sauceId = request.params.get('sauceId')
    // Send fake weeks
    if (request.url === 'example.com/api/weeks' && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.databaseService.getWeeks() }))
    }
    if (request.url === 'example.com/api/users' && request.method === 'GET') {
      return of(new HttpResponse({ status: 200, body: this.databaseService.getUsers() }))
    }
    // Send fake menus by week
    if (request.url.match('example\\.com/api/weeks/\\d/menu') !== null && request.method === 'GET') {

      if (weekId === null || isNaN(parseInt(weekId)) || userId === null || isNaN(parseInt(userId))) {
        return of(new HttpResponse({ status: 500, body: request.method }))
      }

      const selectedWeek = this.databaseService.getWeeks().find((week) => week.id === parseInt(weekId))

      if (selectedWeek === undefined) {
        return of(new HttpResponse({ status: 500, body: request.method }))
      }

      const menuId = selectedWeek.menuId

      const menu = this.databaseService.getMenu(menuId, parseInt(userId), parseInt(weekId))

      // menu!.meals.map(meal => console.log(meal.selected))

      return of(new HttpResponse({ status: 200, body: menu }))

    }
    // Select meal or sauce
    if (request.url === 'example.com/api/meals/select' && request.method === 'GET') {
      if (
        weekId === null || isNaN(parseInt(weekId)) ||
        userId === null || isNaN(parseInt(userId)) ||
        mealId === null || isNaN(parseInt(mealId))
      ) {
        return of(new HttpResponse({ status: 500, body: request.method }))
      }

      this.databaseService.selectMeal(parseInt(userId), parseInt(weekId), parseInt(mealId))

      return of(new HttpResponse({ status: 200, body: true }))

    }
    if (request.url === 'example.com/api/sauce/select' && request.method === 'GET') {

      if (
        weekId === null || isNaN(parseInt(weekId)) ||
        userId === null || isNaN(parseInt(userId)) ||
        sauceId === null || isNaN(parseInt(sauceId))
      ) {
        return of(new HttpResponse({ status: 500, body: request.method }))
      }

      this.databaseService.selectSauce(parseInt(userId), parseInt(weekId), parseInt(sauceId))

      return of(new HttpResponse({ status: 200, body: true }))

    }
    if (request.url === 'example.com/api/user/select' && request.method === 'GET') {

      if (
        userId === null || isNaN(parseInt(userId))
      ) {
        return of(new HttpResponse({ status: 500, body: request.method }))
      }

      this.databaseService.selectUser(parseInt(userId))

      return of(new HttpResponse({ status: 200, body: true }))

    }
    if (request.url === 'example.com/api/user' && request.method === 'GET') {

      return of(new HttpResponse({ status: 200, body: this.databaseService.getSelectedUser() }))

    }
    return of(new HttpResponse({ status: 500, body: request.method }))
  }
}
