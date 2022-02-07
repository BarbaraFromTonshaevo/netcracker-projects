import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Incident, IncidentInfo } from '../model/incident';
import { Assignee } from '../model/assignee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  constructor(private http: HttpClient) { }

  public getIncidents(): Observable<Incident[]>{
    return this.http.get<Incident[]>(`${environment.api}/incidents`);
  }

  public getIncident(id: string): Observable<Incident>{
    return this.http.get<Incident>(`${environment.api}/incidents/${id}`);
  }

  public postIncident(incident: IncidentInfo): Observable<Incident>{
    return this.http.post<Incident>(`${environment.api}/incidents`, JSON.stringify(incident), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public deleteIncident(id: string): Observable<Incident>{
    return this.http.delete<Incident>(`${environment.api}/incidents/${id}`);
  }

  public editIncident(incident: Incident): Observable<Incident>{
    return this.http.put<Incident>(`${environment.api}/incidents`, JSON.stringify(incident), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public changeAssignee(objectInfo: {_id: string, assignee: Assignee}): Observable<Incident>{
    console.log('server')
    console.log(objectInfo._id);
    return this.http.patch<Incident>(`${environment.api}/incidents`, JSON.stringify(objectInfo), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

}
