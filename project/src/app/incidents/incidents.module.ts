import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsComponent } from './incidents.component';
import { AppFioPipe } from '../cdk/pipes/fio.pipe';



@NgModule({
  declarations: [
    IncidentsComponent,
    AppFioPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IncidentsComponent
  ]
})
export class IncidentsModule { }
