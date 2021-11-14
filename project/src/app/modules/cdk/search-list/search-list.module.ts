import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchListComponent } from './search-list.component';
import { AppFioPipe } from '../pipes/fio.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer, USER_REDUCER_NODE} from '../../user/store/user.reducer'




@NgModule({
  declarations: [
    SearchListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(USER_REDUCER_NODE, userReducer),
  ],
  exports: [
    SearchListComponent
  ]
})
export class SearchListModule { }
