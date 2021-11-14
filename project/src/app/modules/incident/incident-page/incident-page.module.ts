import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPageComponent } from './incident-page.component';
import { SearchListModule } from '../../cdk/search-list/search-list.module';


@NgModule({
  declarations: [
    IncidentPageComponent
  ],
  imports: [
    CommonModule,
    SearchListModule,
  ],
  exports: [
    IncidentPageComponent
  ]
})
export class IncidentPageModule { }
