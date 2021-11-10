import { Action } from "@ngrx/store";
import { User } from "../model/user";
// import { UserState } from "./user.reducer";

export enum userActionsType {
  create = '[USER] create user item',
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


export type UserActions = UserCreateAction;

