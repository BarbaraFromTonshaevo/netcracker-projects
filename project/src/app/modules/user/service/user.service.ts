import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User, UserInfo } from '../model/user';
import { UserState } from '../store/user.reducer';

export const USER_LOCALSTORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store$: Store<UserState>) { };

  getUsers(){
    console.log('get User service');
    return JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
  }

  addUser(user: UserInfo){

    let newUser: User = {
      id: 12345,//вставить новое
      fullname: {
        name: user.name,
        surname: user.surname,
        lastname: user.lastname,
      },
      login: user.login,
      dateOfBirth: new Date(user.dateOfBirth),
      position: user.position,
      incidents: null,
    }
  }
}
