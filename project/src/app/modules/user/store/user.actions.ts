import { Action } from "@ngrx/store";
import { User } from "../model/user";
// import { UserState } from "./user.reducer";

export enum userActionsType {
  create = '[USER] create user item',
  delete = '[USER] delete user item',
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


export type UserActions = UserCreateAction | UserDeleteAction;

