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
    let userData: {userList: User[], idIncrement: number} = JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
    userData.userList.push({
      id: userData.idIncrement,
      fullname: {
        name: user.name,
        surname: user.surname,
        lastname: user.lastname,
      },
      login: user.login,
      position: user.position,
      dateOfBirth: user.dateOfBirth,
      incidents: [],
    });
    userData.idIncrement++;
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
  }

  deleteUser(id: number){
    let userData: {userList: User[], idIncrement: number} = JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
    userData.userList = userData.userList.filter(item => item.id !== id);
    console.log(userData);
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
  }

  editUser(user: User){
    let userData: {userList: User[], idIncrement: number} = JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
    userData.userList = userData.userList.map(item => item.id === user.id? user: item);
    console.log(userData);
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
  }

  deleteIncident(id: number, incident: {id: number, name: string}){
    let userData: {userList: User[], idIncrement: number} = JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
    userData.userList = userData.userList.map(item => item.id === id?
      {
        ...item,
        incidents: (item.incidents? item.incidents.filter(inc => inc.id !== incident.id): item.incidents)
      }:item)
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
  }

  addIncident(id: number, incident: {id: number, name: string}){
    let userData: {userList: User[], idIncrement: number} = JSON.parse(String(localStorage.getItem(USER_LOCALSTORAGE_KEY)));
    userData.userList = userData.userList.map(item => item.id === id?
      {
        ...item,
        incidents: [...item.incidents, {id: incident.id, name: incident.name}],
      }: item);
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(userData));
  }
}
