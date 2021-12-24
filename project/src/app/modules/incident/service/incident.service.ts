import { Injectable } from '@angular/core';

export const INCIDENT_LOCALSTORAGE_KEY = 'incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor() { }

  getIncidents(){
    let incidentData = localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY);
    if(incidentData){
      return JSON.parse(String(incidentData));
    }
    throw new Error('The given key does not exist in localstorage');
  }
}
