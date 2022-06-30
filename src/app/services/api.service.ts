import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Menu, User, Week } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (private http: HttpClient) { }

  getWeeks () {
    return this.http.get<Week[]>('example.com/api/weeks')
  }

  getUsers () {
    return this.http.get<User[]>('example.com/api/users')
  }

  getSelectedUser () {
    return this.http.get<User | null>('example.com/api/user')
  }

  getRestaurant (weekId: number, userId: number) {
    let params = new HttpParams()
    params = params.append('weekId', weekId)
    params = params.append('userId', userId)
    return this.http.get<Menu>(`example.com/api/weeks/${weekId}/menu`, { params })
  }

  selectMeal (weekId: number, userId: number, mealId: number) {
    let params = new HttpParams()
    params = params.append('weekId', weekId)
    params = params.append('userId', userId)
    params = params.append('mealId', mealId)
    return this.http.get<boolean>(`example.com/api/meals/select`, { params })
  }

  selectSauce (weekId: number, userId: number, sauceId: number) {
    let params = new HttpParams()
    params = params.append('weekId', weekId)
    params = params.append('userId', userId)
    params = params.append('sauceId', sauceId)
    return this.http.get<boolean>(`example.com/api/sauce/select`, { params })
  }

  selectUser (userId: number) {
    let params = new HttpParams()
    params = params.append('userId', userId)
    return this.http.get<boolean>(`example.com/api/user/select`, { params })
  }
}
