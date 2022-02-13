import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Incident } from '../model/incident';
import { IncidentState } from '../store/incident.reducer';
import { incidentListSelector } from '../store/incident.selector';
import { IncidentDeleteAction, IncidentLoadAction } from '../store/incident.actions';
import { UserState } from '../../user/store/user.reducer';
import { isNgTemplate } from '@angular/compiler';
import { UserDeleteIncidentAction, UserLoadAction } from '../../user/store/user.actions';
import { IncidentService } from '../service/incident.service';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-incidents',
  templateUrl: 'incidents.component.html',
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.incidentStore$.pipe(select(incidentListSelector));
  incidents: Incident[] = [];
  isOpenedPopup = false;

  constructor(
    private router: Router,
    private incidentStore$: Store<IncidentState>,
    private userStore$: Store<UserState>,
    private incidentService: IncidentService,
  ){  }

  addIncident(){
    this.isOpenedPopup = true;
  }

  closeIncidentPopup($event: any){
    this.isOpenedPopup = false;
  }

  openAssignee(route: string){
    this.router.navigate([route]);
  }

  openIncident(route: string){
    this.router.navigate([route]);
  }

  deleteIncident(id: string){
    // удаление из assignee
    let currIncident = this.incidents.find(item => item._id === id);
    if(currIncident?.assignee){
      this.userStore$.dispatch(new UserDeleteIncidentAction({
        _id: currIncident.assignee._id,
        incident: {
          _id: currIncident._id,
          name: currIncident.name,
        }
      }))
    }
    this.incidentStore$.dispatch(new IncidentDeleteAction(id));
  }

  ngOnInit(): void {
    this.userStore$.dispatch(new UserLoadAction);
    this.incidentStore$.dispatch(new IncidentLoadAction);
    this.incidentStore$.pipe(select(incidentListSelector)).subscribe(incidents => {
      this.incidents = incidents;
    });
  }

}
