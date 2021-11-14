import { Component, Input, OnInit } from '@angular/core';
import { Incident } from '../model/incident';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IncidentState } from '../store/incident.reducer';
import { Observable } from 'rxjs';
import { incidentListSelector } from '../store/incident.selector';
import { User } from '../../user/model/user';


@Component({
  selector: 'app-incident-page',
  templateUrl: './incident-page.component.html',
})
export class IncidentPageComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.store$.pipe(select(incidentListSelector));
  incidentsData: Array<Incident> = [];
  currentIncident: Incident;

  setDate(date: Date){
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  onSelectAssignee(user: User){
    console.log(user);
  }

  constructor(
    private store$: Store<IncidentState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.incidents$.subscribe((incidents) => {
      this.incidentsData = incidents;
    });
    const id = +this.route.snapshot.params.id;
    let incident = this.incidentsData.find(x => x.id === id);
    if(incident){
      this.currentIncident = incident;
    }
    else{
      this.router.navigate(['not-found']);
    }
  }

}
