import { Component, Input, OnInit } from '@angular/core';
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
      <th class="table__heading">Дедлайн</th>
      <th class="table__heading">Статус</th>
      <th class="table__heading">Действия</th>
    </thead>
    <tbody>
      <tr class="table__row" *ngFor="let incident of incidents">
        <td class="table__data">{{incident.id}}</td>
        <td class="table__data">{{incident.name}}</td>
        <td class="table__data">{{incident.assignee.fullname | appFio}}</td>
        <td class="table__data">{{incident.area}}</td>
        <td class="table__data">{{incident.startDate | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{incident.dueDate | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{incident.status}}</td>
        <td class="table__data">
          <button class="btn-change">
            <div class="btn-change__icon"></div>
            <span class="btn-change__span">Изменить</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="btn" (click)="addIncident()">Добавить инцидент</button>
  <app-incident-popup *ngIf=isOpenedPopup ></app-incident-popup>
  `,
  styleUrls: ['./incidents.component.less']
})
export class IncidentsComponent implements OnInit {
  incidents: Array<Incident> = incidents;
  isOpenedPopup = false;

  constructor() { }

  addIncident(){
    console.log('open popup');
    this.isOpenedPopup = true;
  }

  ngOnInit(): void {
  }

}
