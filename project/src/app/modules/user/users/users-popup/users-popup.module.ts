import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPopupComponent } from './users-popup.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UsersPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UsersPopupComponent
  ]
})
export class UsersPopupModule { }
