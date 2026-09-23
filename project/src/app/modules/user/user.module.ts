import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersModule } from './users/users.module';
import { UserPageModule } from './user-page/user-page.module';
import { StoreModule } from '@ngrx/store';
import { userReducer, USER_REDUCER_NODE } from './store/user.reducer';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    UsersModule,
    UserPageModule,
    StoreModule.forFeature(USER_REDUCER_NODE, userReducer),
  ],
})
export class UserModule { }
