import { Component, OnInit } from '@angular/core';
import {User} from '../model/user';
import {users} from '../data/users.data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  template: `
  <h2 class="heading">Список пользователей</h2>
  <table class="table">
    <thead class="table__row-heading">
      <th class="table__heading">ID</th>
      <th class="table__heading">ФИО</th>
      <th class="table__heading">Логин</th>
      <th class="table__heading">Дата рождения</th>
      <th class="table__heading">Должность</th>
      <th class="table__heading">Действия</th>
    </thead>
    <tbody>
      <tr class="table__row" *ngFor="let user of users">
        <td class="table__data">{{user.id}}</td>
        <td class="table__data">{{user.fullname.surname}} {{user.fullname.name}} {{user.fullname.lastname}}</td>
        <td class="table__data">{{user.login}}</td>
        <td class="table__data">{{user.dateOfBirth | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{user.position}}</td>
        <td class="table__data">
          <button class="btn-change" (click)="openUser(('user/' + user.id))">
            <div class="btn-change__icon"></div>
            <span class="btn-change__span">Изменить</span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <button class="btn" (click)="addUser()">Добавить пользователя</button>
  <app-users-popup *ngIf='isOpenedPopup' (closeClicked)='closeUserPopup($event)'></app-users-popup>


  `,
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  users: Array<User> = users;
  isOpenedPopup = false;
  constructor(
    private router: Router,
  ) { }

  addUser(){
    this.isOpenedPopup = true;
  }

  closeUserPopup($event: any){
    console.log('closeIncidentPopup');
    this.isOpenedPopup = false;
  }

  openUser(route: string){
    this.router.navigate([route]);
  }

  ngOnInit(): void {
  }

}
