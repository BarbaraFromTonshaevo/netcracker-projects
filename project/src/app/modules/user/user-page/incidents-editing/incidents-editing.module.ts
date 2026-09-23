import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncidentsEditingComponent } from './incidents-editing.component';
import { SearchInputModule } from 'src/app/modules/cdk/search-input/search-input.module';



@NgModule({
  declarations: [
    IncidentsEditingComponent
  ],
  imports: [
    CommonModule,
    SearchInputModule,
  ],
  exports: [
    IncidentsEditingComponent
  ]
})
export class IncidentsEditingModule { }
