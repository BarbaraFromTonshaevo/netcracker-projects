import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from 'src/app/modules/user/model/user';
import { UserState } from 'src/app/modules/user/store/user.reducer';
import { userListSelector } from 'src/app/modules/user/store/user.selector';

import { Incident } from '../../model/incident';
import { IncidentState } from '../../store/incident.reducer';
import { IncidentCreateAction } from '../../store/incident.actions';
import { incidentListSelector } from '../../store/incident.selector';

import { priorityArray } from '../../model/priority';
import { Assignee } from '../../model/assignee';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-incident-popup',
  templateUrl: './incident-popup.component.html',
})
export class IncidentPopupComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.incidentsStore$.pipe(select(incidentListSelector));
  users$: Observable<User[]> = this.usersStore$.pipe(select(userListSelector));

  incidentsData: Incident[] = [];
  priorities: string[] = priorityArray;
  @Output() closeClicked = new EventEmitter();

  name: string = '';
  area: string = '';
  duedate: string = '';
  assignee: Assignee|null = null;
  isValid: boolean = true;
  errorMessage: string;
  priority: string = this.priorities[0];
  description: string = '';

  usersForSearch: {_id: string, name: string}[] = [];

  changePriority(priorityValue: string){
    this.priority = priorityValue;
  }

  getId(id: string){
    this.users$.subscribe((users) => {
      let assignee = users.find(item => item._id === id);
      this.assignee = assignee? assignee : null;
    })
  }

  closePopup($event: Event){
    $event.preventDefault();
    this.closeClicked.emit();
  }

  onSelectAssignee(user: User){
    this.assignee = {_id: user._id, fullname: user.fullname};
  }

  validation(){
    this.isValid = true;
    this.errorMessage = '';

    if(this.name.trim() === ''){
      this.errorMessage += ' Не указано имя.';
      this.isValid = false;
      document.querySelector('input[name="name"]')?.classList.add('border-error');
    }

    if(this.area.trim() === ''){
      this.errorMessage += ' Не указана область.';
      this.isValid = false;
      document.querySelector('input[name="area"]')?.classList.add('border-error');
    }

    if(this.duedate.trim() === ''){
      this.errorMessage += ' Не указан дедлайн.';
      this.isValid = false;
      document.querySelector('input[name="duedate"]')?.classList.add('border-error');
    }
    else{
      if(new Date(this.duedate) < new Date()){
        this.errorMessage += ' Дата дедлайна меньше текущей даты.';
        this.isValid = false;
        document.querySelector('input[name="duedate"]')?.classList.add('border-error');
      }
    }


  }

  cleanForm(){
    document.querySelectorAll('input').forEach(item => {
      item.classList.remove('border-error');
      item.value = '';
    });
  }

  onCreate(event: Event){
    event.preventDefault();
    this.validation();
    if(this.isValid){
      //добавить изменения в стор с инцидентами
      this.incidentsStore$.dispatch(new IncidentCreateAction({
        name: this.name,
        area: this.area,
        startDate: new Date(),
        dueDate: new Date(this.duedate),
        assignee: this.assignee,
        priority: this.priority,
        description: this.description,
        status: 'Открыт'
      }));
      //отчистить
      this.cleanForm();
      this.closeClicked.emit();
    }
  }

  constructor(
    private incidentsStore$: Store<IncidentState>,
    private usersStore$: Store<UserState>
    ) { }

  ngOnInit(): void {
    this.incidents$.subscribe((incidents) => {
      this.incidentsData = incidents;
    });
    this.users$.subscribe((users)=>{
      this.usersForSearch = users.map(item => {
        return {
          _id: item._id,
          name: `${item.fullname.surname} ${item.fullname.name} ${item.fullname.lastname}`,
        }
      })
    })
  }

}
