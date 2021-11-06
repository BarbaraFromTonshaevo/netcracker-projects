import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersPopupModule } from './users-popup/users-popup.module';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    UsersPopupModule,
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
