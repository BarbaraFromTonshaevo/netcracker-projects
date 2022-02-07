import { Action } from "@ngrx/store";
import { Incident, IncidentInfo } from "../model/incident";
import { Assignee } from "../model/assignee";

export enum incidentActionsType {
  load = '[INCIDENT] load incident items',
  loadedError = '[INCIDENT] incident loaded error',
  loadedSuccess = '[INCIDENT] incident loaded success',

  create = '[INCIDENT] create incident item',
  createError = '[INCIDENT] create incident item error',
  createSuccess = '[INCIDENT] create incident item success',

  delete = '[INCIDENT] delete incident item',
  deleteError = '[INCIDENT] delete incident item error',
  deleteSuccess = '[INCIDENT] delete incident item success',

  edit = '[INCIDENT] edit incident item',
  editSuccess = '[INCIDENT] edit incident item success',
  editError = '[INCIDENT] edit incident item error',

  changeAssignee = '[INCIDENT] change assignee for incident item',
  changeAssigneeSuccess = '[INCIDENT] change assignee for incident item success',
  changeAssigneeError = '[INCIDENT] change assignee for incident item error',

}

export class IncidentLoadAction implements Action {
  readonly type = incidentActionsType.load;
}

export class IncidentLoadedSuccessAction implements Action {
  readonly type = incidentActionsType.loadedSuccess;
  constructor(public payload: Incident[]){}
}

export class IncidentLoadedErrorAction implements Action {
  readonly type = incidentActionsType.loadedError;
}

export class IncidentCreateAction implements Action {
  readonly type = incidentActionsType.create;
  constructor(public payload: IncidentInfo){}
}

export class IncidentCreateSuccessAction implements Action {
  readonly type = incidentActionsType.createSuccess;
  constructor(public payload: Incident){}
}

export class IncidentCreateErrorAction implements Action {
  readonly type = incidentActionsType.createError;
}


export class IncidentDeleteAction implements Action {
  readonly type = incidentActionsType.delete;
  constructor(public payload:  string){}
}

export class IncidentDeleteSuccessAction implements Action {
  readonly type = incidentActionsType.deleteSuccess;
  constructor(public payload:  string){}
}

export class IncidentDeleteErrorAction implements Action {
  readonly type = incidentActionsType.deleteError;
}

export class IncidentEditAction implements Action {
  readonly type = incidentActionsType.edit;
  constructor(public payload: Incident){}
}

export class IncidentEditSuccessAction implements Action {
  readonly type = incidentActionsType.editSuccess;
  constructor(public payload: Incident){}
}

export class IncidentEditErrorAction implements Action {
  readonly type = incidentActionsType.editError;
}

// Change Assignee

export class IncidentChangeAssigneeAction implements Action {
  readonly type = incidentActionsType.changeAssignee;
  constructor(public payload: {_id: string, assignee: Assignee|null}){
    console.log('IncidentChangeAssigneeAction');
  }
}

export class IncidentChangeAssigneeSuccessAction implements Action {
  readonly type = incidentActionsType.changeAssigneeSuccess;
  constructor(public payload: Incident){
    console.log('IncidentChangeAssigneeSuccessAction');

  }
}

export class IncidentChangeAssigneeErrorAction implements Action {
  readonly type = incidentActionsType.changeAssigneeError;
}

export type IncidentActions = IncidentCreateAction | IncidentCreateSuccessAction | IncidentCreateErrorAction |
                              IncidentDeleteAction |IncidentDeleteSuccessAction |IncidentDeleteErrorAction |
                              IncidentEditAction | IncidentEditSuccessAction |IncidentEditErrorAction |
                              IncidentChangeAssigneeAction | IncidentChangeAssigneeSuccessAction | IncidentChangeAssigneeErrorAction |
                              IncidentLoadAction | IncidentLoadedSuccessAction | IncidentLoadedErrorAction;

