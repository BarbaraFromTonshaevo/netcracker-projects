import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPageComponent } from './incident-page.component';
import { SearchInputModule } from '../../cdk/search-input/search-input.module';
import { FormsModule } from '@angular/forms';
import { SelectModule } from '../../cdk/select/select.module';


@NgModule({
  declarations: [
    IncidentPageComponent
  ],
  imports: [
    CommonModule,
    SearchInputModule,
    FormsModule,
    SelectModule
  ],
  exports: [
    IncidentPageComponent
  ]
})
export class IncidentPageModule { }
