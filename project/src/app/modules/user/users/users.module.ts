import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { UsersPopupComponent } from './users-popup/users-popup.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersPopupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
