import { Action } from "@ngrx/store";
import { User, UserInfo } from "../model/user";
// import { UserState } from "./user.reducer";

export enum userActionsType {
  create = '[USER] create user item',
  delete = '[USER] delete user item',
  edit = '[USER] edit user item',
  addincident = '[USER] add incident in user item',
  deleteincident = '[USER] delete incident in user item',

  load = '[USER] load user items',
  loadedSuccess = '[USER] user loaded success',
  loadedError = '[USER] user loaded error',
}

export class UserCreateAction implements Action {
  readonly type = userActionsType.create;
  constructor(public payload: UserInfo) {
  }
}

export class UserDeleteAction implements Action {
  readonly type = userActionsType.delete;
  constructor(public payload: string) {
  }
}

export class UserEditAction implements Action {
  readonly type = userActionsType.edit;
  constructor(public payload: User) {
  }
}

export class UserAddIncidentAction implements Action {
  readonly type = userActionsType.addincident;
  constructor(public payload: {_id: string, incident: {_id: string, name: string}}) {
  }
}

export class UserDeleteIncidentAction implements Action {
  readonly type = userActionsType.deleteincident;
  constructor(public payload: {_id: string, incident: {_id: string, name: string}}) {
  }
}

//Loading

export class UserLoadAction implements Action {
  readonly type = userActionsType.load;
}

export class UserLoadedSuccess implements Action {
  readonly type = userActionsType.loadedSuccess;
  constructor(public payload: { userList: User[]}) {
  };
}

export class UserLoadedError implements Action {
  readonly type = userActionsType.loadedError;
}

export type UserActions = UserCreateAction | UserDeleteAction | UserAddIncidentAction | UserEditAction | UserDeleteIncidentAction
 | UserLoadAction | UserLoadedSuccess | UserLoadedError;

