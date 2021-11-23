import { Action } from "@ngrx/store";
import { User } from "../model/user";
// import { UserState } from "./user.reducer";

export enum userActionsType {
  create = '[USER] create user item',
  delete = '[USER] delete user item',
  edit = '[USER] edit user item',
  addincident = '[USER] add incident in user item',
  deleteincident = '[USER] delete incident in user item',
}

export class UserCreateAction implements Action {
  readonly type = userActionsType.create;
  constructor(public payload: {
    name: string,
    surname: string,
    lastname: string,
    login: string,
    position: string,
    dateOfBirth: Date }) {
  }
}

export class UserDeleteAction implements Action {
  readonly type = userActionsType.delete;
  constructor(public payload: {id: number}) {
  }
}

export class UserEditAction implements Action {
  readonly type = userActionsType.edit;
  constructor(public payload: User) {
  }
}

export class UserAddIncidentAction implements Action {
  readonly type = userActionsType.addincident;
  constructor(public payload: {id: number, incident: {id: number, name: string}}) {
  }
}

export class UserDeleteIncidentAction implements Action {
  readonly type = userActionsType.deleteincident;
  constructor(public payload: {id: number, incident: {id: number, name: string}}) {
  }
}

export type UserActions = UserCreateAction | UserDeleteAction | UserAddIncidentAction | UserEditAction | UserDeleteIncidentAction;

