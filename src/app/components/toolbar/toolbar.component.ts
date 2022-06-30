import { Component, OnDestroy, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  authSubscription: Subscription | null = null
  signedIn = false

  constructor (private auth: AuthService) { }

  ngOnInit (): void {
    this.authSubscription = this.auth.signedIn.subscribe((user) => {
      if (user !== null) {
        this.signedIn = true
      }
    })
  }

  ngOnDestroy () {
    if (this.authSubscription !== null) {
      this.authSubscription.unsubscribe()
    }
  }

}
