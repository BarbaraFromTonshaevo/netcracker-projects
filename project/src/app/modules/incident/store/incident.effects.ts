import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { IncidentService } from "../service/incident.service";
import { incidentActionsType, IncidentLoadedError, IncidentLoadedSuccess } from "./incident.actions";
import { catchError, map} from 'rxjs/operators';
import { of } from "rxjs";
import { ProcessLoadedError } from "../../process/store/process.actions";

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
}
