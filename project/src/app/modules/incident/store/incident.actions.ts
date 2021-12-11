import { Action } from "@ngrx/store";
import { Incident } from "../model/incident";
import { Assignee } from "../model/assignee";

export enum incidentActionsType {
  create = '[INCIDENT] create incident item',
  delete = '[INCIDENT] delete incident item',
  edit = '[INCIDENT] edit incident item',
  changeAssignee = '[INCIDENT] change assignee for incident item',
  load = '[INCIDENT] load incident items',
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
    dueDate: Date;
    priority: string,
    description: string,
  }){}
}

export class IncidentDeleteAction implements Action {
  readonly type = incidentActionsType.delete;
  constructor(public payload: {id: number}){}
}

export class IncidentEditAction implements Action {
  readonly type = incidentActionsType.edit;
  constructor(public payload: Incident){}
}

export class IncidentLoadAction implements Action {
  readonly type = incidentActionsType.load;
  // constructor(public payload: Incident){}
}

export class IncidentChangeAssigneeAction implements Action {
  readonly type = incidentActionsType.changeAssignee;
  constructor(public payload: {id: number, assignee: Assignee}){}
}



export type IncidentActions = IncidentCreateAction | IncidentDeleteAction | IncidentEditAction | IncidentChangeAssigneeAction | IncidentLoadAction;

