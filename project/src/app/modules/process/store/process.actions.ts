import { Action } from "@ngrx/store";
import { Status } from "./process.reducer";

export enum processActionsType {
  delete = '[PROCESS] delete process item',
  deleteSuccess = '[PROCESS] delete process item success',
  deleteError = '[PROCESS] delete process item error',

  add = '[PROCESS] add process item',
  addSuccess = '[PROCESS] add process item success',
  addError = '[PROCESS] add process item error',

  load = '[PROCESS] load process item',
  loadedSuccess = '[PROCESS] load process success',
  loadError = '[PROCESS] load process error',
}

export class ProcessDeleteAction implements Action {
  readonly type = processActionsType.delete;
  constructor(public payload: {status: Status, value: string}){
  }
}
export class ProcessDeleteSuccessAction implements Action {
  readonly type = processActionsType.deleteSuccess;
  constructor(public payload: Status){
  }
}
export class ProcessDeleteErrorAction implements Action {
  readonly type = processActionsType.deleteError;
}


export class ProcessAddAction implements Action {
  readonly type = processActionsType.add;
  constructor(public payload: {status: Status, value: string}){
  }
}
export class ProcessAddSuccessAction implements Action {
  readonly type = processActionsType.addSuccess;
  constructor(public payload: Status){
  }
}
export class ProcessAddErrorAction implements Action {
  readonly type = processActionsType.addError;
}


export class ProcessLoadAction implements Action {
  readonly type = processActionsType.load;
}
export class ProcessLoadedSuccessAction implements Action {
  readonly type = processActionsType.loadedSuccess;
  constructor(public payload: Status[]){}
}
export class ProcessLoadedErrorAction implements Action {
  readonly type = processActionsType.loadError;
}


export type ProcessActions = ProcessDeleteAction | ProcessDeleteSuccessAction | ProcessDeleteErrorAction |
ProcessAddAction | ProcessAddSuccessAction | ProcessAddErrorAction |
ProcessLoadAction | ProcessLoadedSuccessAction | ProcessLoadedErrorAction;
