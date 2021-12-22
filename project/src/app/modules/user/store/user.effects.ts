import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { UserService } from "../service/user.service";
import { userActionsType, UserLoadedSuccess} from "./user.actions";
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { User } from "../model/user";

@Injectable()
export class UserEffects {

  loadUser$ = createEffect(()=>this.actions$.pipe(
    ofType(userActionsType.load),
    map((action)=>{
      console.log('effect load');
      new UserLoadedSuccess(this.userService.getUsers());
    })
  ),{dispatch: false});

  // loadUser$ = this.actions$.pipe(
  //   ofType(userActionsType.load),
  //   map((action)=>{
  //     console.log('effect load');
  //     new UserLoadedSuccess(this.userService.getUsers());
  //   }));

  constructor (private actions$: Actions,
    private userService: UserService){
  }
}

