import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPageComponent } from './incident-page.component';
import { SearchInputModule } from '../../cdk/search-input/search-input.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IncidentPageComponent
  ],
  imports: [
    CommonModule,
    SearchInputModule,
    FormsModule,
  ],
  exports: [
    IncidentPageComponent
  ]
})
export class IncidentPageModule { }
