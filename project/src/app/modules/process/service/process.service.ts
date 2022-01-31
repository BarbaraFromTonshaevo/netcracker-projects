import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  public getProcess(){
    return this.http.get(`${environment.api}/process`).toPromise()
  }

  public addProcess(){

  }

  public deleteProcess(){
    
  }

  constructor(private http: HttpClient) { }
}
