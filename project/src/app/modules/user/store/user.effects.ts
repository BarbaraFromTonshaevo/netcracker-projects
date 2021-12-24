import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { userActionsType, UserLoadedSuccess} from "./user.actions";
import { map, tap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.load),
    map(()=>{
      return new UserLoadedSuccess(this.userService.getUsers());
    })
  ));

  addUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.create),
    tap((action: any)=>{
      this.userService.addUser(action.payload)
    })
  ),{dispatch: false});


  constructor (private actions$: Actions,
    private userService: UserService){
  }
}

