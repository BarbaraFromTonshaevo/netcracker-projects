import { Action } from "@ngrx/store";
import { Incident, IncidentInfo } from "../model/incident";
import { Assignee } from "../model/assignee";

export enum incidentActionsType {
  create = '[INCIDENT] create incident item',
  delete = '[INCIDENT] delete incident item',
  edit = '[INCIDENT] edit incident item',
  changeAssignee = '[INCIDENT] change assignee for incident item',

  load = '[INCIDENT] load incident items',
  loadedSuccess = '[INCIDENT] incident loaded success',
  loadedError = '[INCIDENT] incident loaded error',
}

export class IncidentCreateAction implements Action {
  readonly type = incidentActionsType.create;
  constructor(public payload: IncidentInfo){}
}

export class IncidentDeleteAction implements Action {
  readonly type = incidentActionsType.delete;
  constructor(public payload: {id: number}){}
}

export class IncidentEditAction implements Action {
  readonly type = incidentActionsType.edit;
  constructor(public payload: Incident){}
}

export class IncidentChangeAssigneeAction implements Action {
  readonly type = incidentActionsType.changeAssignee;
  constructor(public payload: {id: number, assignee: Assignee}){}
}

export class IncidentLoadAction implements Action {
  readonly type = incidentActionsType.load;
}

export class IncidentLoadedSuccess implements Action {
  readonly type = incidentActionsType.loadedSuccess;
  constructor(public payload: {incidentList: Incident[], idIncrement: number}){}
}

export class IncidentLoadedError implements Action {
  readonly type = incidentActionsType.loadedError;
}

export type IncidentActions = IncidentCreateAction | IncidentDeleteAction | IncidentEditAction | IncidentChangeAssigneeAction |
 IncidentLoadAction | IncidentLoadedSuccess | IncidentLoadedError;

