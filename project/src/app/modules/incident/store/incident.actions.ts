import { Action } from "@ngrx/store";

export enum incidentActionsType {
  create = '[INCIDENT] create incident item',
}

export class IncidentCreateAction implements Action {
  readonly type = incidentActionsType.create;
  constructor(public payload: {
    name: string,
    assignee?: {
      id: number,
      fullname: {
        name: string,
        surname: string,
        lastname: string,
      }
    };
    area: string;
    startDate: Date;
    dueDate: Date;
    status: string;}){}
}


export type IncidentActions = IncidentCreateAction;

