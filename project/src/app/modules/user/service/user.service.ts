import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UserInfo } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.api}/users`);
  }

  public getUser(id: string): Observable<User>{
    return this.http.get<User>(`${environment.api}/users/${id}`);
  }

  public postUser(user: UserInfo): Observable<User>{
    return this.http.post<User>(`${environment.api}/users`, JSON.stringify(user),
    {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public deleteUser(id: string): Observable<User>{
    return this.http.delete<User>(`${environment.api}/users/${id}`);
  }

  public editUser(user: User): Observable<User>{
    return this.http.put<User>(`${environment.api}/users`, JSON.stringify(user),
     {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public addIncident(_id: string, incident: {_id: string, name: string}): Observable<User>{
    return this.http.patch<User>(`${environment.api}/users/assignee/add`, JSON.stringify({_id, incident}),
     {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public deleteIncident(_id: string, incident: {_id: string, name: string}): Observable<User>{
    return this.http.patch<User>(`${environment.api}/users/assignee/delete`, JSON.stringify({_id, incident}),
     {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  constructor(private http: HttpClient) { }
}
