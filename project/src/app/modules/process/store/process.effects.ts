import { Injectable } from "@angular/core";
import { act, Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { ProcessService } from "../service/process.service";
import { processActionsType, ProcessLoadedSuccessAction, ProcessLoadedErrorAction, ProcessAddSuccessAction, ProcessAddErrorAction, ProcessDeleteSuccessAction, ProcessDeleteErrorAction } from "./process.actions";
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { Status } from "./process.reducer";


@Injectable()
export class ProcessEffects {
  constructor (private actions$: Actions,
    private processService: ProcessService){
  }

  loadProcess$ = createEffect(() => this.actions$.pipe(
    ofType(processActionsType.load),
    switchMap((_) =>
      this.processService.getProcess()
    ),
    switchMap((res: Status[])=>  [new ProcessLoadedSuccessAction(res)]),
    catchError(()=> of(new ProcessLoadedErrorAction()))
  ));

  addProcess$ = createEffect(() => this.actions$.pipe(
    ofType(processActionsType.add),
    switchMap((action: any) =>
      this.processService.addProcess(action.payload.status, action.payload.value)
    ),
    switchMap((res: Status)=>  [new ProcessAddSuccessAction(res)]),
    catchError(()=> of(new ProcessAddErrorAction()))
  ));

  deleteProcess$ = createEffect(() => this.actions$.pipe(
    ofType(processActionsType.delete),
    switchMap((action: any) =>
      this.processService.deleteProcess(action.payload.status, action.payload.value)
    ),
    switchMap((res: Status)=>  [new ProcessDeleteSuccessAction(res)]),
    catchError(()=> of(new ProcessDeleteErrorAction()))
  ));
}
