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
    let userData = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if(userData){
      return JSON.parse(String(userData));
    }
    throw new Error('The given key does not exist in localstorage');
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
