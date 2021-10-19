import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentPageComponent } from './incident-page/incident-page.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { ProcessComponent } from './process/process.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UsersComponent } from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: IncidentsComponent,
  },
  {
    path: 'process',
    component: ProcessComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'user/:id',
    component: UserPageComponent,
  },
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


