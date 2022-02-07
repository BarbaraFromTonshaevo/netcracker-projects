import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { userActionsType, UserAddIncidentErrorAction, UserAddIncidentSuccessAction, UserCreateErrorAction, UserCreateSuccessAction, UserDeleteErrorAction, UserDeleteIncidentErrorAction, UserDeleteIncidentSuccessAction, UserDeleteSuccessAction, UserEditErrorAction, UserEditSuccessAction, UserLoadedErrorAction, UserLoadedSuccessAction} from "./user.actions";
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { of } from "rxjs";
import { User } from "../model/user";

@Injectable()
export class UserEffects {
  constructor (private actions$: Actions,
    private userService: UserService){
  }

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.load),
    switchMap((_) =>
      this.userService.getUsers()
    ),
    switchMap((res: User[])=>  [new UserLoadedSuccessAction(res)]),
    catchError(()=> of(new UserLoadedErrorAction()))
  ));

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.create),
    switchMap((action: any) =>
      this.userService.postUser(action.payload)
    ),
    switchMap((res: User)=>  [new UserCreateSuccessAction(res)]),
    catchError(()=> of(new UserCreateErrorAction()))
  ));

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.delete),
    switchMap((action: any) =>
      this.userService.deleteUser(action.payload)
    ),
    switchMap((res: User)=>  [new UserDeleteSuccessAction(res._id)]),
    catchError(()=> of(new UserDeleteErrorAction()))
  ));

  editUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.edit),
    switchMap((action: any) =>
      this.userService.editUser(action.payload)
    ),
    switchMap((res: User)=>  [new UserEditSuccessAction(res)]),
    catchError(()=> of(new UserEditErrorAction()))
  ));

  addIncident$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.addincident),
    switchMap((action: any) =>
      this.userService.addIncident(action.payload._id, action.payload.incident)
    ),
    switchMap((res: User)=>  [new UserAddIncidentSuccessAction(res)]),
    catchError(()=> of(new UserAddIncidentErrorAction()))
  ));

  deleteIncident$ = createEffect(() => this.actions$.pipe(
    ofType(userActionsType.deleteincident),
    switchMap((action: any) =>
      this.userService.deleteIncident(action.payload._id, action.payload.incident)
    ),
    switchMap((res: User)=>  [new UserDeleteIncidentSuccessAction(res)]),
    catchError(()=> of(new UserDeleteIncidentErrorAction()))
  ));
}

