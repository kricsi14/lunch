import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { WeeklyMenuListComponent } from './pages/weekly-menu-list/weekly-menu-list.component'
import { MenuListComponent } from './components/menu-list/menu-list.component'
import { UsersComponent } from './pages/users/users.component'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: WeeklyMenuListComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'week/:weekId',
        component: MenuListComponent
      }
    ]
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
