import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UserPageComponent
  ]
})
export class UserPageModule { }
