import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IncidentService } from "../service/incident.service";
import { incidentActionsType, IncidentLoadedError, IncidentLoadedSuccess } from "./incident.actions";
import { catchError, map, tap} from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class IncidentEffects {
  constructor (private actions$: Actions,
    private incidentService: IncidentService){
  }

  loadIncidents$ = createEffect(()=>this.actions$.pipe(
    ofType(incidentActionsType.load),
    map(()=>{
      console.log('effect load');
      return new IncidentLoadedSuccess(this.incidentService.getIncidents());
    }),
    catchError(()=> of(new IncidentLoadedError()))
  ))

  addIncident$ = createEffect(()=>this.actions$.pipe(
    ofType(incidentActionsType.create),
    tap((action: any)=>{
      this.incidentService.addIncident(action.payload);
    })
  ),{dispatch: false});
}
