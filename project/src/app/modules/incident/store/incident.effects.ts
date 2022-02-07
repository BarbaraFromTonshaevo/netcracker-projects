import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { IncidentService } from "../service/incident.service";
import { incidentActionsType, IncidentChangeAssigneeErrorAction, IncidentChangeAssigneeSuccessAction, IncidentCreateErrorAction, IncidentCreateSuccessAction, IncidentDeleteErrorAction, IncidentDeleteSuccessAction, IncidentEditErrorAction, IncidentEditSuccessAction, IncidentLoadedErrorAction, IncidentLoadedSuccessAction } from "./incident.actions";
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { of } from "rxjs";
import { Incident, IncidentInfo } from "../model/incident";

@Injectable()
export class IncidentEffects {
  constructor (private actions$: Actions,
    private incidentService: IncidentService){
  }

  loadIncidents$ = createEffect(() => this.actions$.pipe(
    ofType(incidentActionsType.load),
    switchMap((_) =>
      this.incidentService.getIncidents()
    ),
    switchMap((res: Incident[])=>  [new IncidentLoadedSuccessAction(res)]),
    catchError(()=> of(new IncidentLoadedErrorAction()))
  ));

  addIncidents$ = createEffect(() => this.actions$.pipe(
    ofType(incidentActionsType.create),
    switchMap((action: any) =>
      this.incidentService.postIncident(action.payload)
    ),
    switchMap((res: Incident)=>  [new IncidentCreateSuccessAction(res)]),
    catchError(()=> of(new IncidentCreateErrorAction()))
  ));

  deleteIncidents$ = createEffect(() => this.actions$.pipe(
    ofType(incidentActionsType.delete),
    switchMap((action: any) =>
      this.incidentService.deleteIncident(action.payload)
    ),
    switchMap((res: Incident)=>  [new IncidentDeleteSuccessAction(res._id)]),
    catchError(()=> of(new IncidentDeleteErrorAction()))
  ));

  editIncidents$ = createEffect(() => this.actions$.pipe(
    ofType(incidentActionsType.edit),
    switchMap((action: any) =>
      this.incidentService.editIncident(action.payload)
    ),
    switchMap((res: Incident)=>  [new IncidentEditSuccessAction(res)]),
    catchError(()=> of(new IncidentEditErrorAction()))
  ));

  changeAssignee$ = createEffect(() => this.actions$.pipe(
    ofType(incidentActionsType.changeAssignee),
    switchMap((action: any) =>
      this.incidentService.changeAssignee(action.payload)
    ),
    switchMap((res: Incident)=>  [new IncidentChangeAssigneeSuccessAction(res)]),
    catchError(()=> of(new IncidentChangeAssigneeErrorAction()))
  ));
}
