import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { userActionsType } from "./user.actions";

@Injectable()
export class UserEffects {

  // $addUser = createEffect(()=>{
  //   this.actions$.pipe(ofType(userActionsType.create),
  //   tap(action => localStorage.setItem('user', JSON.stringify(action))))
  // })

  constructor (private actions$: Actions){
  }
}


