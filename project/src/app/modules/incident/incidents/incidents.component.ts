import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Incident } from '../model/incident';
import { incidents } from '../data/incidents.data'


@Component({
  selector: 'app-incidents',
  templateUrl: 'incidents.component.html',
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  incidents: Array<Incident> = incidents;
  isOpenedPopup = false;

  constructor(
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

  ngOnInit(): void {
  }

}
