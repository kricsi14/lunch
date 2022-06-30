import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { User, Week } from '../../interfaces'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-weekly-menu-list',
  templateUrl: './weekly-menu-list.component.html',
  styleUrls: ['./weekly-menu-list.component.scss']
})
export class WeeklyMenuListComponent implements OnInit, OnDestroy {
  weeks: Week[] | null = null
  authSubscription: Subscription | null = null
  user: User | null = null

  constructor (private apiService: ApiService, private auth: AuthService) { }

  ngOnInit (): void {
    this.apiService.getWeeks().subscribe((weeks) => {
      this.weeks = weeks
    })
    this.authSubscription = this.auth.signedIn.subscribe(user => {
      if (user !== null) {
        this.user = user
      }
    })
  }

  ngOnDestroy () {
    if (this.authSubscription !== null) {
      this.authSubscription.unsubscribe()
    }
  }
}
