import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsComponent } from './incidents.component';
import { AppFioPipe } from 'src/app/modules/cdk/pipes/fio.pipe';
import { IncidentPopupComponent } from './incident-popup/incident-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchListModule } from '../../cdk/search-list/search-list.module';



@NgModule({
  declarations: [
    IncidentsComponent,
    AppFioPipe,
    IncidentPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchListModule
  ],
  exports: [
    IncidentsComponent
  ]
})
export class IncidentsModule { }
