import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {filter} from 'rxjs/operators'

import { IncidentState } from '../store/incident.reducer';
import { incidentFeatureSelector } from '../store/incident.selector';
import { IncidentLoadStateAction } from '../store/incident.actions';

export const INCIDENT_LOCALSTORAGE_KEY = 'incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentSyncStorageService {
  private isInit = false;
  constructor(private store$: Store<IncidentState>) { }

  init(){
    if(this.isInit){
      return;
    }

    this.isInit = true;
    this.loadFromStorage();
    this.store$.pipe(
      select(incidentFeatureSelector),
      filter(state => !!state)
      ).subscribe(state => {
      localStorage.setItem(INCIDENT_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    window.addEventListener('storage', () => {
      this.loadFromStorage();
    });
  }

  private loadFromStorage(){
    const storageState = localStorage.getItem(INCIDENT_LOCALSTORAGE_KEY);
    if(storageState){
      this.store$.dispatch(new IncidentLoadStateAction({state: JSON.parse(storageState)}));
    }
  }
}
