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

  deleteIncident$ = createEffect(()=>this.actions$.pipe(
    ofType(incidentActionsType.delete),
    tap((action: any)=>{
      this.incidentService.deleteIncident(action.payload);
    })
  ),{dispatch: false});

  editIncident$ = createEffect(()=>this.actions$.pipe(
    ofType(incidentActionsType.edit),
    tap((action: any)=>{
      this.incidentService.editIncident(action.payload);
    })
  ),{dispatch: false});

  changeAssignee$ = createEffect(()=>this.actions$.pipe(
    ofType(incidentActionsType.changeAssignee),
    tap((action: any)=>{
      this.incidentService.changeAssignee(action.payload.id, action.payload.assignee);
    })
  ),{dispatch: false});
}
