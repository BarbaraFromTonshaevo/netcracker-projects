import { Injectable } from '@angular/core';
import { Assignee } from '../model/assignee';
import { Incident, IncidentInfo } from '../model/incident';

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

  addIncident(incident: IncidentInfo){
    let incidentData: {incidentList: Incident[], idIncrement: number} = JSON.parse(String(localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY)));
    incidentData.incidentList.push({
      id: incidentData.idIncrement,
      assignee: incident.assignee,
      name: incident.name,
      area: incident.area,
      startDate: incident.startDate,
      dueDate: incident.dueDate,
      priority: incident.priority,
      description: incident.description,
      status: 'Открыто',
    });
    incidentData.idIncrement++;
    localStorage.setItem(INCIDENT_LOCALSTORAGE_KEY, JSON.stringify(incidentData));
  }

  deleteIncident(id: number){
    let incidentData: {incidentList: Incident[], idIncrement: number} = JSON.parse(String(localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY)));
    incidentData.incidentList = incidentData.incidentList.filter(item => item.id !== id);
    localStorage.setItem(INCIDENT_LOCALSTORAGE_KEY, JSON.stringify(incidentData));
  }

  editIncident(incident: Incident){
    let incidentData: {incidentList: Incident[], idIncrement: number} = JSON.parse(String(localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY)));
    incidentData.incidentList = incidentData.incidentList.map(item => item.id === incident.id? incident: item);
    localStorage.setItem(INCIDENT_LOCALSTORAGE_KEY, JSON.stringify(incidentData));
  }

  changeAssignee(id: number, assignee: Assignee|null){
    console.log('change assignee service');
    let incidentData: {incidentList: Incident[], idIncrement: number} = JSON.parse(String(localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY)));
    incidentData.incidentList = incidentData.incidentList.map(item => item.id === id?
      {
        ...item,
        assignee: assignee
      }: item);
    localStorage.setItem(INCIDENT_LOCALSTORAGE_KEY, JSON.stringify(incidentData));
  }


}
