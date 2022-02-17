import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsComponent } from './incidents.component';
import { AppFioPipe } from 'src/app/modules/cdk/pipes/fio.pipe';
import { IncidentPopupModule } from './incident-popup/incident-popup.module';
import { AppIdPipe } from '../../cdk/pipes/id.pipe';
import { AppNamePipe } from '../../cdk/pipes/name.pipe';



@NgModule({
  declarations: [
    IncidentsComponent,
    AppFioPipe,
    AppIdPipe,
    AppNamePipe,
  ],
  imports: [
    CommonModule,
    IncidentPopupModule
  ],
  exports: [
    IncidentsComponent
  ]
})
export class IncidentsModule { }
