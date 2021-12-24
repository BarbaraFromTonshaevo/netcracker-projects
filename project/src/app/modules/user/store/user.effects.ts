import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { userActionsType, UserLoadedSuccess} from "./user.actions";
import { map, tap } from 'rxjs/operators';
import { dispatch } from "rxjs/internal/observable/pairs";

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.load),
    map(()=>{
      console.log('effect load');
      return new UserLoadedSuccess(this.userService.getUsers());
    })
  ));

  // addUser$ = this.actions$.pipe(
  //   ofType(userActionsType.create),
  //   tap(action => )

  // )

  constructor (private actions$: Actions,
    private userService: UserService){
  }
}

