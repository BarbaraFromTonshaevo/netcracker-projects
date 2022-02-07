import { Action } from "@ngrx/store";
import { User, UserInfo } from "../model/user";
// import { UserState } from "./user.reducer";

export enum userActionsType {
  load = '[USER] load user items',
  loadedError = '[USER] user loaded error',
  loadedSuccess = '[USER] user loaded success',

  create = '[USER] create user item',
  createError = '[USER] create user item error',
  createSuccess = '[USER] create user item success',

  delete = '[USER] delete user item',
  deleteError = '[USER] delete user item error',
  deleteSuccess = '[USER] delete user item success',

  edit = '[USER] edit user item',
  editSuccess = '[USER] edit user item success',
  editError = '[USER] edit user item error',

  addincident = '[USER] add incident in user item',
  addincidentSuccess = '[USER] add incident in user item success',
  addincidentError = '[USER] add incident in user item error',

  deleteincident = '[USER] delete incident in user item',
  deleteincidentSuccess = '[USER] delete incident in user item success',
  deleteincidentError = '[USER] delete incident in user item error',

}

//Loading

export class UserLoadAction implements Action {
  readonly type = userActionsType.load;
}

export class UserLoadedSuccessAction implements Action {
  readonly type = userActionsType.loadedSuccess;
  constructor(public payload:  User[]) {
  };
}

export class UserLoadedErrorAction implements Action {
  readonly type = userActionsType.loadedError;
}

// Create

export class UserCreateAction implements Action {
  readonly type = userActionsType.create;
  constructor(public payload: UserInfo) {
  }
}

export class UserCreateSuccessAction implements Action {
  readonly type = userActionsType.createSuccess;
  constructor(public payload: User) {
  }
}

export class UserCreateErrorAction implements Action {
  readonly type = userActionsType.createError;
}

// Delete

export class UserDeleteAction implements Action {
  readonly type = userActionsType.delete;
  constructor(public payload: string) {
  }
}

export class UserDeleteSuccessAction implements Action {
  readonly type = userActionsType.deleteSuccess;
  constructor(public payload: string) {
  }
}

export class UserDeleteErrorAction implements Action {
  readonly type = userActionsType.deleteError;
}

// Edit
export class UserEditAction implements Action {
  readonly type = userActionsType.edit;
  constructor(public payload: User) {
  }
}

export class UserEditSuccessAction implements Action {
  readonly type = userActionsType.editSuccess;
  constructor(public payload: User) {
  }
}

export class UserEditErrorAction implements Action {
  readonly type = userActionsType.editError;
}

// Add Incident

export class UserAddIncidentAction implements Action {
  readonly type = userActionsType.addincident;
  constructor(public payload: {_id: string, incident: {_id: string, name: string}}) {
  }
}

export class UserAddIncidentSuccessAction implements Action {
  readonly type = userActionsType.addincidentSuccess;
  constructor(public payload: User) {
  }
}

export class UserAddIncidentErrorAction implements Action {
  readonly type = userActionsType.addincidentError;
}

// Delete Incident

export class UserDeleteIncidentAction implements Action {
  readonly type = userActionsType.deleteincident;
  constructor(public payload: {_id: string, incident: {_id: string, name: string}}) {
  }
}

export class UserDeleteIncidentSuccessAction implements Action {
  readonly type = userActionsType.deleteincidentSuccess;
  constructor(public payload: User) {
  }
}

export class UserDeleteIncidentErrorAction implements Action {
  readonly type = userActionsType.deleteincidentError;
}

export type UserActions =
UserLoadAction | UserLoadedSuccessAction | UserLoadedErrorAction |
UserCreateAction |  UserCreateSuccessAction | UserCreateErrorAction |
UserDeleteAction | UserDeleteErrorAction | UserDeleteSuccessAction |
UserEditAction | UserEditSuccessAction | UserEditErrorAction |
UserAddIncidentAction | UserAddIncidentSuccessAction | UserAddIncidentErrorAction |
UserDeleteIncidentAction | UserDeleteIncidentSuccessAction | UserDeleteIncidentErrorAction;

