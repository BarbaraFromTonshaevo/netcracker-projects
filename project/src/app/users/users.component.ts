import { Component, OnInit } from '@angular/core';
import {User} from '../model/user'
import {users} from '../data/users.data'

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
    </thead>
    <tbody>
      <tr class="table__row" *ngFor="let user of users">
        <td class="table__data">{{user.id}}</td>
        <td class="table__data">{{user.fullname.surname}} {{user.fullname.name}} {{user.fullname.lastname}}</td>
        <td class="table__data">{{user.login}}</td>
        <td class="table__data">{{user.dateOfBirth | date:"dd.MM.yyyy"}}</td>
        <td class="table__data">{{user.position}}</td>
      </tr>
    </tbody>
  </table>
  <button class="btn">Добавить пользователя</button>


  `,
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  users: Array<User> = users;
  constructor() { }

  ngOnInit(): void {
  }

}
