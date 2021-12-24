import { Action } from "@ngrx/store";
import { Status } from "./process.reducer";

export enum processActionsType {
  delete = '[PROCESS] delete process item',
  add = '[PROCESS] add process item',

  load = '[PROCESS] load process item',
  loadedSuccess = '[PROCESS] load process success',
  loadError = '[PROCESS] load process error',
}

export class ProcessDeleteAction implements Action {
  readonly type = processActionsType.delete;
  constructor(public payload: {id: number, value: string}){}
}
export class ProcessAddAction implements Action {
  readonly type = processActionsType.add;
  constructor(public payload: {id: number, value: string}){
    console.log('PROCESS ADD');
  }
}
export class ProcessLoadAction implements Action {
  readonly type = processActionsType.load;
}
export class ProcessLoadedSuccess implements Action {
  readonly type = processActionsType.loadedSuccess;
  constructor(public payload: {processList: Status[]}){}
}
export class ProcessLoadedError implements Action {
  readonly type = processActionsType.loadError;
}
export type ProcessActions = ProcessDeleteAction | ProcessAddAction | ProcessLoadAction | ProcessLoadedSuccess | ProcessLoadedError;
