import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../data/users.data'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less'],
})
export class UserPageComponent implements OnInit {
  isOpenedIncidentSearch = false;
  usersData: Array<User> = [];
  currentUser: User = {
    id: 54321,
    fullname: {
      name: 'Иван',
      surname: 'Иванов',
      lastname: 'Иванович',
    },
    login: 'example',
    dateOfBirth: new Date(2000, 0, 1),
    position: 'Программист',
  };
  newUser: any;

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
    this.usersData = users;
    const id = +this.route.snapshot.params.id;
    let newUser = this.usersData.find(x => x.id === id);
    if(newUser){
      this.currentUser = newUser;
    }
    else{
      this.router.navigate(['not-found']);
    }
  }

  openRoute(route: string){
    this.router.navigate(['/',route]);
  }

  changeIsOpenedIncidentSearch(){
    this.isOpenedIncidentSearch = !this.isOpenedIncidentSearch;
  }

  addIncident(){
    console.log('валидация...');
    console.log('сохранение изменения...');
    this.isOpenedIncidentSearch = !this.isOpenedIncidentSearch;
  }
}
