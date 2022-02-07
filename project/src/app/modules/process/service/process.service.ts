import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../store/process.reducer';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  public getProcess(): Observable<Status[]>{
    return this.http.get<Status[]>(`${environment.api}/process`);
  }

  public addProcess(status: Status, value: string): Observable<Status>{
    status = {
        ...status,
        toStatus: [...status.toStatus, value]
      }
    return this.http.patch<Status>(`${environment.api}/process`, status);
  }

  public deleteProcess(status: Status, value: string): Observable<Status>{
    status = {
      ...status,
      toStatus: status.toStatus.filter(item => item !== value)
    }
    return this.http.patch<Status>(`${environment.api}/process`, status);
  }

  constructor(private http: HttpClient) { }
}
