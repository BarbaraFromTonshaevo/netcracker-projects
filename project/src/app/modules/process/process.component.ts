import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { statuses } from './model/status';
import { ProcessAddAction, ProcessDeleteAction, ProcessLoadAction } from './store/process.actions';
import { ProcessState, Status } from './store/process.reducer';
import { processListSelector } from './store/process.selector';

interface Condition{
  search: string[],
  select: string,
  isDisabledEdition: boolean,
  isOpenedEdition: boolean,
}

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.less']
})
export class ProcessComponent implements OnInit {
  processes$: Observable<Status[]> = this.store$.pipe(select(processListSelector));
  processes: Status[] = [];
  conditions: Condition[] = [];
  statusList = statuses;


  constructor(
    private store$: Store<ProcessState>,
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(new ProcessLoadAction);
    this.processes$.subscribe(currProcess => {
      this.processes = currProcess;
      currProcess.forEach(processItem => {
        this.conditions.push({
          search: this.statusList.filter(status => (!processItem.toStatus.includes(status)) && (status !== processItem.status)),
          select: '',
          isDisabledEdition: false,
          isOpenedEdition: false,
        });
      })
    });
  }

  openEdit(index: number){
    this.conditions[index].isOpenedEdition = true;
    this.conditions[index].select = this.conditions[index].search[0];
  }

  closeEdit(index: number){
    this.conditions[index].isOpenedEdition = false;
  }

  addSelectedItem(status: string, index: number){
    this.conditions[index].select = status;
  }

  addStatus(statusItem: Status){
    // добавить в процесс
    this.store$.dispatch(new ProcessAddAction({status: statusItem, value: this.conditions[statusItem.position].select}));
    // убрать из списка поиска
    this.conditions[statusItem.position].search = this.conditions[statusItem.position].search.filter(item => item !== this.conditions[statusItem.position].select);
    // отчистить селект
    this.conditions[statusItem.position].select = '';
    // проверить существование добавлений.
    if(this.conditions[statusItem.position].search.length === 0){
      this.conditions[statusItem.position].isDisabledEdition = true;
    }
    // переключить
    this.conditions[statusItem.position].isOpenedEdition = false;
  }

  deleteStatus(statusItem: Status, status: string){
    // this.processes[index].toStatus = this.processes[index].toStatus.filter(item => item !== status);
    this.store$.dispatch(new ProcessDeleteAction({status: statusItem, value: status}))
    this.conditions[statusItem.position].search.push(status);
    this.conditions[statusItem.position].isDisabledEdition = false;
  }

}
