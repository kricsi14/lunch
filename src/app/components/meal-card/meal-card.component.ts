import { Component, Input, OnInit } from '@angular/core'
import { Meal, Sauce } from '../../interfaces'

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss']
})
export class MealCardComponent implements OnInit {

  @Input() meal: Meal | Sauce | null = null
  @Input() selected: boolean = false

  constructor () { }

  ngOnInit (): void {
  }

}
