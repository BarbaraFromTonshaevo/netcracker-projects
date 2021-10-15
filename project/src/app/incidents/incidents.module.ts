import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsComponent } from './incidents.component';
import { AppFioPipe } from '../cdk/pipes/fio.pipe';
import { IncidentPopupModule } from './incident-popup/incident-popup.module';



@NgModule({
  declarations: [
    IncidentsComponent,
    AppFioPipe,
  ],
  imports: [
    CommonModule,
    IncidentPopupModule,
  ],
  exports: [
    IncidentsComponent
  ]
})
export class IncidentsModule { }
