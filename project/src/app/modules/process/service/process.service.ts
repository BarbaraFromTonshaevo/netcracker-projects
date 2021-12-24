import { Injectable } from '@angular/core';
import { Status } from '../store/process.reducer';

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
    let processData: Status[] = JSON.parse(String(localStorage.getItem(PROCESS_LOCALSTORAGE_KEY)));
    console.log(processData);
    processData.find(item => item.id === id)?.toStatus.push(value);
    console.log(processData);
    // add in localStorage
    localStorage.setItem('process', JSON.stringify(processData));
  }
}
