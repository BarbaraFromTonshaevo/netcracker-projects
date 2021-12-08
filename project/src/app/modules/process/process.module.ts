import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessComponent } from './process.component';
import { SelectModule } from '../cdk/select/select.module';
import { StoreModule } from '@ngrx/store';
import { processReducer, PROCESS_REDUCER_NODE } from './store/process.reducer';



@NgModule({
  declarations: [
    ProcessComponent,
  ],
  imports: [
    CommonModule,
    SelectModule,
    StoreModule.forFeature(PROCESS_REDUCER_NODE, processReducer),
  ],
  exports: [
    ProcessComponent
  ]
})
export class ProcessModule { }
