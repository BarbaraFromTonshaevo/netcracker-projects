import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentPopupComponent } from './incident-popup.component';
import { FormsModule } from '@angular/forms';
import { SearchInputModule } from 'src/app/modules/cdk/search-input/search-input.module';



@NgModule({
  declarations: [
    IncidentPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchInputModule
  ],
  exports: [
    IncidentPopupComponent
  ]
})
export class IncidentPopupModule { }
