import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentPageComponent } from './modules/incident/incident-page/incident-page.component';
import { IncidentsComponent } from './modules/incident/incidents/incidents.component';
import { ProcessComponent } from './modules/process/process.component';
import { UserPageComponent } from './modules/user/user-page/user-page.component';
import { UsersComponent } from './modules/user/users/users.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: IncidentsComponent,
  },
  // {
  //   path: 'process',
  //   component: ProcessComponent,
  // },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  // },
  // {
  //   path: 'user/:id',
  //   component: UserPageComponent,
  // },
  {
    path: 'incident/:id',
    component: IncidentPageComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


