import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { IncidentService } from "../service/incident.service";
import { incidentActionsType, IncidentLoadedError, IncidentLoadedSuccess } from "./incident.actions";
import { catchError, map, tap, switchMap} from 'rxjs/operators';
import { of } from "rxjs";
import { Incident } from "../model/incident";

@Injectable()
export class IncidentEffects {
  constructor (private actions$: Actions,
    private incidentService: IncidentService){
  }

  // loadIncidents$ = createEffect(() => this.actions$.pipe(
  //   ofType(incidentActionsType.load),
  //   map(() =>
  //     this.incidentService.getIncidents().pipe(
  //       map(
  //         (response: Incident[]) =>
  //         new IncidentLoadedSuccess(response)
  //       )
  //     )
  //   )
  // ));

  // loadIncidents$ = this.actions$.pipe(
  //   ofType(incidentActionsType.load),
  //   map(() =>
  //   {
  //     console.log("HERE");
  //     this.incidentService.getIncidents().then(
  //         (incidents: any) => {
  //           return new IncidentLoadedSuccess(incidents)},
  //       catchError(() => of(new IncidentLoadedError()))
  //     );
  //   }
  //   )
  // );

  loadIncidents$ = createEffect(this.actions$.pipe(
    ofType(incidentActionsType.load),
    switchMap(() =>
      this.incidentService.getIncidents()
    ),
    switchMap((res)=>  [new IncidentLoadedSuccess(res))])
  ));

  // loadIncidents$ = createEffect(()=>this.actions$.pipe(
  //   ofType(incidentActionsType.load),
  //   map(()=>{
  //     return new IncidentLoadedSuccess(this.incidentService.getIncidents());
  //   }),
  //   catchError(()=> of(new IncidentLoadedError()))
  // ))

  // addIncident$ = createEffect(()=>this.actions$.pipe(
  //   ofType(incidentActionsType.create),
  //   tap((action: any)=>{
  //     this.incidentService.addIncident(action.payload);
  //   })
  // ),{dispatch: false});

  // deleteIncident$ = createEffect(()=>this.actions$.pipe(
  //   ofType(incidentActionsType.delete),
  //   tap((action: any)=>{
  //     this.incidentService.deleteIncident(action.payload);
  //   })
  // ),{dispatch: false});

  // editIncident$ = createEffect(()=>this.actions$.pipe(
  //   ofType(incidentActionsType.edit),
  //   tap((action: any)=>{
  //     this.incidentService.editIncident(action.payload);
  //   })
  // ),{dispatch: false});

  // changeAssignee$ = createEffect(()=>this.actions$.pipe(
  //   ofType(incidentActionsType.changeAssignee),
  //   tap((action: any)=>{
  //     this.incidentService.changeAssignee(action.payload.id, action.payload.assignee);
  //   })
  // ),{dispatch: false});
}
