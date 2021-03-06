import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { WeeklyMenuListComponent } from './pages/weekly-menu-list/weekly-menu-list.component'
import { MenuListComponent } from './components/menu-list/menu-list.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FakeDataInterceptor } from './interceptors/fake-data.interceptor'
import { WeekTabLinkComponent } from './components/week-tab-link/week-tab-link.component'
import { MealCardComponent } from './components/meal-card/meal-card.component'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { UsersComponent } from './pages/users/users.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    WeeklyMenuListComponent,
    MenuListComponent,
    WeekTabLinkComponent,
    MealCardComponent,
    ToolbarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: FakeDataInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
