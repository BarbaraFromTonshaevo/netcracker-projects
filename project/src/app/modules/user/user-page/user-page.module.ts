import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { FormsModule } from '@angular/forms';
import { SearchInputModule } from '../../cdk/search-input/search-input.module';
import { IncidentsEditingModule } from './incidents-editing/incidents-editing.module';



@NgModule({
  declarations: [
    UserPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchInputModule,
    IncidentsEditingModule
  ],
  exports: [
    UserPageComponent
  ]
})
export class UserPageModule { }
