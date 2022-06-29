import { Component, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-week-tab-link',
  templateUrl: './week-tab-link.component.html',
  styleUrls: ['./week-tab-link.component.scss']
})
export class WeekTabLinkComponent implements OnInit {
  @Input('url') linkUrl: string| null = null
  @Input('text') linkName: string | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
