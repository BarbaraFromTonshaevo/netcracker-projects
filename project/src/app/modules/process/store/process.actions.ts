import { Action } from "@ngrx/store";

export enum processActionsType {
  delete = '[PROCESS] delete process item',
  add = '[PROCESS] add process item',
}

export class processDeleteAction implements Action {
  readonly type = processActionsType.delete;
  constructor(public payload: {id: number, value: string}){}
}
export class processAddAction implements Action {
  readonly type = processActionsType.add;
  constructor(public payload: {id: number, value: string}){}
}
export type ProcessActions = processDeleteAction | processAddAction;
