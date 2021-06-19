import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchngPageComponent } from './matchng-page/matchng-page.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {path: "UsersList" , component: UsersListComponent},
  {path: "addUsers" , component:MatchngPageComponent },
  { path: '',   redirectTo: '/addUsers', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent =[UsersListComponent,MatchngPageComponent]
