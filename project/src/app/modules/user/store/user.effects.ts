import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { userActionsType, UserLoadedError, UserLoadedSuccess} from "./user.actions";
import { catchError, map, tap } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.load),
    map(()=>{
      return new UserLoadedSuccess(this.userService.getUsers());
    }),
    catchError(()=> of(new UserLoadedError()))
  ));

  addUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.create),
    tap((action: any)=>{
      this.userService.addUser(action.payload);
    })
  ),{dispatch: false});

  deleteUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.delete),
    tap((action: any)=>{
      this.userService.deleteUser(action.payload);
    })
  ),{dispatch: false});

  editUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.edit),
    tap((action: any)=>{
      this.userService.editUser(action.payload);
    })
  ),{dispatch: false});

  addIncident$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.addincident),
    tap((action: any)=>{
      this.userService.addIncident(action.payload.id, action.payload.incident);
    })
  ),{dispatch: false});

  deleteIncident$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.deleteincident),
    tap((action: any)=>{
      this.userService.deleteIncident(action.payload.id, action.payload.incident);
    })
  ),{dispatch: false});

  constructor (private actions$: Actions,
    private userService: UserService){
  }
}

