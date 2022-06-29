import { Component, Input, OnInit } from '@angular/core'
import { MenuItem } from '../../interfaces/responses'

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {

  @Input() meal: MenuItem | null = null
  @Input() selected: boolean = false

  constructor () { }

  ngOnInit (): void {
  }

}
