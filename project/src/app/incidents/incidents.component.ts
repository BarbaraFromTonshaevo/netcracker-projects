import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Incident } from '../model/incident';
import { incidents } from '../data/incidents.data'


@Component({
  selector: 'app-incidents',
  template: `
  <h2 class="heading">Список инцидентов</h2>
  <table class="table">
    <thead class="table__row-heading">
      <th class="table__heading">ID</th>
      <th class="table__heading">Название задания</th>
      <th class="table__heading">Исполнитель</th>
      <th class="table__heading">Область</th>
      <th class="table__heading">Дата начала</th>
      <th class="table__heading">Дата дедлайна</th>
      <th class="table__heading">Статус</th>
      <th class="table__heading">Действия</th>
    </thead>
    <tbody>
      <tr class="table__row" *ngFor="let incident of incidents">
        <td class="table__data">{{incident.id}}</td>
        <td class="table__data">{{incident.name}}</td>
        <td class="table__data">
          <button class="btn-assignee" (click)="openAssignee(('user/'+incident.assignee?.id))">{{incident.assignee?.fullname | appFio }}</button>
        </td>
        <td class="table__data">{{incident.area}}</td>
        <td class="table__data">{{incident.startDate | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{incident.dueDate | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{incident.status}}</td>
        <td class="table__data">
          <a class="btn-change" (click)="openIncident(('incident/' + incident.id))">
            <div class="btn-change__icon"></div>
            <span class="btn-change__span">Изменить</span>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="btn" (click)="addIncident()">Добавить инцидент</button>
  <app-incident-popup *ngIf='isOpenedPopup' (closeClicked)='closeIncidentPopup($event)'></app-incident-popup>
  `,
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
