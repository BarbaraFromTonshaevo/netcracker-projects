import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Incident } from '../model/incident';
import { select, Store } from '@ngrx/store';
import { IncidentState } from '../store/incident.reducer';
import { incidentListSelector } from '../store/incident.selector';
import { IncidentDeleteAction } from '../store/incident.actions';


@Component({
  selector: 'app-incidents',
  templateUrl: 'incidents.component.html',
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.store$.pipe(select(incidentListSelector));
  isOpenedPopup = false;

  constructor(
    private store$: Store<IncidentState>,
    private router: Router,
  ) { }

  addIncident(){
    console.log('open popup');
    this.isOpenedPopup = true;
  }

  closeIncidentPopup($event: any){
    console.log('closeIncidentPopup');
    this.isOpenedPopup = false;
  }

  openAssignee(route: string){
    this.router.navigate([route]);
  }

  openIncident(route: string){
    this.router.navigate([route]);
  }

  deleteIncident(id: number){
    this.store$.dispatch(new IncidentDeleteAction({id}));
  }

  ngOnInit(): void {
  }

}
