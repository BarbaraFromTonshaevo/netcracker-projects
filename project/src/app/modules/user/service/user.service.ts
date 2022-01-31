import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UserInfo } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getUsers(){
    return this.http.get(`${environment.api}/users`).toPromise()
  }

  public getUser(id: string){
    return this.http.get(`${environment.api}/users/${id}`).toPromise();
  }

  public postUser(user: UserInfo){
    return this.http.post(`${environment.api}/users`, JSON.stringify(user),
    {headers:  { "Accept": "application/json", "Content-Type": "application/json" }}).toPromise();
  }

  public deleteUser(id: string){
    return this.http.delete(`${environment.api}/users/${id}`).toPromise();
  }

  public editUsers(user: User){
    return this.http.put(`${environment.api}/users`, JSON.stringify(user),
     {headers:  { "Accept": "application/json", "Content-Type": "application/json" }}).toPromise();
  }

  public changeAssignee(objectInfo: {id: number, incident: {id: string, name: string}}){
    return this.http.patch(`${environment.api}/incidents`, JSON.stringify(objectInfo),
     {headers:  { "Accept": "application/json", "Content-Type": "application/json" }}).toPromise();
  }

  constructor(private http: HttpClient) { }
}
