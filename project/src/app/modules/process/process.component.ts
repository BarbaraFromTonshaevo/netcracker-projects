import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { statuses } from './model/status';
import { processAddAction, processDeleteAction } from './store/process.actions';
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

  addStatus(index: number){
    // добавить в процесс
    this.store$.dispatch(new processAddAction({id: index, value: this.conditions[index].select}));
    // убрать из списка поиска
    this.conditions[index].search = this.conditions[index].search.filter(item => item !== this.conditions[index].select);
    // отчистить селект
    this.conditions[index].select = '';
    // проверить существование добавлений.
    if(this.conditions[index].search.length === 0){
      this.conditions[index].isDisabledEdition = true;
    }
    // переключить
    this.conditions[index].isOpenedEdition = false;
  }

  deleteStatus(index: number, status: string){
    // this.processes[index].toStatus = this.processes[index].toStatus.filter(item => item !== status);
    this.store$.dispatch(new processDeleteAction({id: index, value: status}))
    this.conditions[index].search.push(status);
    this.conditions[index].isDisabledEdition = false;
  }

}
