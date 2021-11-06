import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPopupComponent } from './users-popup.component';



@NgModule({
  declarations: [
    UsersPopupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsersPopupComponent
  ]
})
export class UsersPopupModule { }
