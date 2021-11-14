import { Action } from "@ngrx/store";

export enum incidentActionsType {
  create = '[INCIDENT] create incident item',
  delete = '[INCIDENT] delete incident item',
}

export class IncidentCreateAction implements Action {
  readonly type = incidentActionsType.create;
  constructor(public payload: {
    name: string,
    assignee: {
      id: number,
      fullname: {
        name: string,
        surname: string,
        lastname: string,
      }
    } | null;
    area: string;
    startDate: Date;
    dueDate: Date;}){}
}

export class IncidentDeleteAction implements Action {
  readonly type = incidentActionsType.delete;
  constructor(public payload: {id: number}){}
}


export type IncidentActions = IncidentCreateAction | IncidentDeleteAction;

