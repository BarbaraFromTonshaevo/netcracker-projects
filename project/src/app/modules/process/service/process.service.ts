import { Injectable } from '@angular/core';
import { PROCESS_REDUCER_NODE, Status } from '../store/process.reducer';

export const PROCESS_LOCALSTORAGE_KEY = 'process';

@Injectable({
  providedIn: 'root'
})

export class ProcessService {
  // processData: Status[] = [];

  constructor() { }

  getProcess(){
    let processData = localStorage.getItem(PROCESS_LOCALSTORAGE_KEY);
    if(processData){
      return JSON.parse(String(processData));
    }
    throw new Error('The given key does not exist in localstorage');
  }

  addProcess(id: number, value: string){
    let processData: Status[] = JSON.parse(String(localStorage.getItem(PROCESS_LOCALSTORAGE_KEY))).processList;
    let newItem = processData.map(item => item.id === id?
      {
        ...item,
        toStatus: [...item.toStatus, value]
      }:
      item);
    localStorage.setItem(PROCESS_REDUCER_NODE, JSON.stringify({processList: newItem}));
  }
}
