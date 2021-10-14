import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncidentsComponent } from './incidents/incidents.component';
import { ProcessComponent } from './process/process.component';
import { UsersComponent } from './users/users.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


