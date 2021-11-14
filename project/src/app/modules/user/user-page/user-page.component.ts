import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { users } from '../data/users.data'
import { select, Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import { Observable } from 'rxjs';
import { userListSelector } from '../store/user.selector';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less'],
})
export class UserPageComponent implements OnInit {
  users$: Observable<User[]> = this.store$.pipe(select(userListSelector));
  isOpenedIncidentSearch = false;
  usersData: Array<User> = [];
  currentUser: User;
  newUser: any;

  setDate(date: Date){
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  constructor(
    private store$: Store<UserState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.usersData = users;
    });
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
