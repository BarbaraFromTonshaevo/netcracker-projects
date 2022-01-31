import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Incident, IncidentInfo } from '../model/incident';
import { Assignee } from '../model/assignee';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  public getIncidents(){
    return this.http.get(`${environment.api}/incidents`);
  }

  public getIncident(id: string){
    return this.http.get(`${environment.api}/incidents/${id}`);
  }

  public postIncident(incident: IncidentInfo){
    return this.http.post(`${environment.api}/incidents`, JSON.stringify(incident), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public deleteIncident(id: string){
    return this.http.delete(`${environment.api}/incidents/${id}`);
  }

  public editIncident(incident: Incident){
    return this.http.put(`${environment.api}/incidents`, JSON.stringify(incident), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  public changeAssignee(objectInfo: {id: string, assignee: Assignee}){
    return this.http.patch(`${environment.api}/incidents`, JSON.stringify(objectInfo), {headers:  { "Accept": "application/json", "Content-Type": "application/json" }});
  }

  constructor(private http: HttpClient) { }
}
