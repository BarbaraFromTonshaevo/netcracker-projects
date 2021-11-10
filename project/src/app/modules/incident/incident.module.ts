import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { INCIDENT_REDUCER_NODE, incidentReducer } from './store/incident.reducer';
import { IncidentsModule } from './incidents/incidents.module';
import { IncidentPageModule } from './incident-page/incident-page.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IncidentsModule,
    IncidentPageModule,
    StoreModule.forFeature(INCIDENT_REDUCER_NODE, incidentReducer),

  ]
})
export class IncidentModule { }
