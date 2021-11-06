import { Component, Input, OnInit } from '@angular/core';
import { Incident } from '../model/incident';
import { incidents } from '../data/incidents.data';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-incident-page',
  templateUrl: './incident-page.component.html',
})
export class IncidentPageComponent implements OnInit {
  incidentsData: Array<Incident> = [];
  currentIncident: Incident = {
    id: 12345,
    name: 'Name of incident',
    area: 'Area',
    startDate: new Date(),
    dueDate: new Date(),
    status: 'В работе',
  }

  setDate(date: Date){
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('INCIDENTPAGE');
    this.incidentsData = incidents;
    console.log(this.incidentsData);
    const id = +this.route.snapshot.params.id;
    console.log(id);
    let incident = this.incidentsData.find(x => x.id === id);
    console.log(incident);
    if(incident){
      this.currentIncident = incident;
    }
    else{
      this.router.navigate(['not-found']);
    }
  }

}
