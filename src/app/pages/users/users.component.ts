import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { User } from '../../interfaces'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  search = ''
  users: User[] = []
  selectedUser: User | null = null
  authSubscription: Subscription | null = null

  constructor (private apiService: ApiService, private auth: AuthService) { }

  ngOnInit (): void {
    this.apiService.getUsers().subscribe((users) => {
      this.users = users
    })
    this.authSubscription = this.auth.signedIn.subscribe(user => {
      if (user !== null) {
        this.selectedUser = user
      }
    })
  }

  selectUser (userId: number) {
    this.apiService.selectUser(userId).subscribe(
      (result) => {
        if (result === true) {
          this.apiService.getSelectedUser().subscribe(user => {
            this.auth.signedIn.next(user)
          })
        }
      }
    )
  }

  ngOnDestroy () {
    if (this.authSubscription !== null) {
      this.authSubscription.unsubscribe()
    }
  }

}
