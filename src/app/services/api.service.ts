import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { WeekListResponse, WeekMenusListResponse } from '../interfaces/responses'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor (private http: HttpClient) { }

  getWeeks () {
    return this.http.get<WeekListResponse>('example.com/api/weeks')
  }

  getRestaurant (weekId: number) {
    let params = new HttpParams()
    params = params.append('weekId', weekId)
    return this.http.get<WeekMenusListResponse>(`example.com/api/weeks/${weekId}/menu`, { params })
  }
}
