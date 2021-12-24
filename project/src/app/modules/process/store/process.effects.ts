import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { ProcessService } from "../service/process.service";
import { processActionsType, ProcessLoadedSuccess, ProcessLoadedError } from "./process.actions";
import { map, catchError, tap } from 'rxjs/operators';
import { of } from "rxjs";


@Injectable()
export class ProcessEffects {
  constructor (private actions$: Actions,
    private processService: ProcessService){
  }


  loadProcess$ = createEffect(()=>this.actions$.pipe(
    ofType(processActionsType.load),
    map(()=>{
      console.log('effect load');
      return new ProcessLoadedSuccess(this.processService.getProcess());
    }),
    catchError(()=>{
      console.log('error');
      return of(new ProcessLoadedError());
    })
  ));

  addProcess$ = createEffect(()=>this.actions$.pipe(
    ofType(processActionsType.add),
    tap((action)=>{
      // console.log(action);
      this.processService.addProcess(action.payload.id, action.payload.value)
    })
  ),{dispatch: false});


  // addProcess$ = createEffect(()=>this.actions$.pipe(
  //   ofType(processActionsType.add),
  //   tap(()=>{
  //     console.log('tap');
  //   })
  // ))


}
