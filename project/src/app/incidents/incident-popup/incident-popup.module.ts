import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPopupComponent } from './incident-popup.component';



@NgModule({
  declarations: [
    IncidentPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IncidentPopupComponent
  ]
})
export class IncidentPopupModule { }
