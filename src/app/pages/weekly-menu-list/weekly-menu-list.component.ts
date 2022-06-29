import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { WeekListResponse } from '../../interfaces/responses'

@Component({
  selector: 'app-weekly-menu-list',
  templateUrl: './weekly-menu-list.component.html',
  styleUrls: ['./weekly-menu-list.component.scss']
})
export class WeeklyMenuListComponent implements OnInit {
  weeks: WeekListResponse | null = null

  constructor (private apiService: ApiService) { }

  ngOnInit (): void {
    this.apiService.getWeeks().subscribe((weeks) => {
      this.weeks = weeks
    })
  }
}
