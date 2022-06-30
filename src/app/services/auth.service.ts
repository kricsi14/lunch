import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { User } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signedIn = new BehaviorSubject<User | null>(null)

  constructor () { }
}
