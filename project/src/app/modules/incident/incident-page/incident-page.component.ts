import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Assignee } from '../model/assignee';
import { Incident } from '../model/incident';
import { IncidentState } from '../store/incident.reducer';
import { incidentListSelector } from '../store/incident.selector';

import { User } from '../../user/model/user';
import { UserState } from '../../user/store/user.reducer';
import { userListSelector } from '../../user/store/user.selector';
import { IncidentEditAction } from '../store/incident.actions';
import { UserAddIncidentAction, UserDeleteIncidentAction } from '../../user/store/user.actions';


@Component({
  selector: 'app-incident-page',
  templateUrl: './incident-page.component.html',
})
export class IncidentPageComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.incidentStore$.pipe(select(incidentListSelector));
  users$: Observable<User[]> = this.userStore$.pipe(select(userListSelector));

  incidentsData: Array<Incident> = [];
  currentIncident: Incident;
  usersForSearch: {id: number, name: string}[] = [];

  name: string = '';
  area: string = '';
  startDate: string = '';
  dueDate: string = '';
  status: string = '';
  assignee: Assignee|null;
  initialAssignee: {id: number, name: string};


  constructor(
    private incidentStore$: Store<IncidentState>,
    private userStore$: Store<UserState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.incidents$.subscribe((incidents) => {
      this.incidentsData = incidents;
    });
    const id = +this.route.snapshot.params.id;
    let incident = this.incidentsData.find(x => x.id === id);
    if(incident){
      this.currentIncident = incident;

      this.name = this.currentIncident.name;
      this.assignee = this.currentIncident.assignee;
      this.area = this.currentIncident.area;
      this.dueDate = this.setDate(this.currentIncident.dueDate);
      this.startDate = this.setDate(this.currentIncident.startDate);
      this.status = this.currentIncident.status;
      if(this.currentIncident.assignee !== null){
        this.initialAssignee = Object.create({
          id: this.currentIncident.assignee?.id,
          name: `${this.currentIncident.assignee?.fullname.surname} ${this.currentIncident.assignee?.fullname.name} ${this.currentIncident.assignee?.fullname.lastname}`,
        })
      }
    }
    else{
      this.router.navigate(['not-found']);
    }
    this.users$.subscribe((users)=>{
      // в будущем можно вставить проверку на пороф пригодность
      this.usersForSearch = users.map(item => {
        return {
          id: item.id,
          name: `${item.fullname.surname} ${item.fullname.name} ${item.fullname.lastname}`,
        }
      })
    })
  }

  setDate(date: Date){
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  onSelectAssignee(id: number){
    this.users$.subscribe((users)=>{
      let user = users.find(item => item.id === id);
      if(user){
        this.assignee = user;
      }
    })
  }

  isValid: boolean = true;
  errorMessage: string = '';

  validation(){
    this.isValid = true;
    this.errorMessage = '';

    if(this.name.trim() === ''){
      this.errorMessage += ' Не указано название инцидента.';
      this.isValid = false;
      document.querySelector('input[name="name"]')?.classList.add('border-error');
    }

    if(this.area.trim() === ''){
      this.errorMessage += ' Не указана область.';
      this.isValid = false;
      document.querySelector('input[name="area"]')?.classList.add('border-error');
    }

    if(this.startDate.trim() === ''){
      this.errorMessage += ' Не указана дата начала.';
      this.isValid = false;
      document.querySelector('input[name="startdate"]')?.classList.add('border-error');
    }

    if(this.dueDate.trim() === ''){
      this.errorMessage += ' Не указана дедлайн.';
      this.isValid = false;
      document.querySelector('input[name="dueDate"]')?.classList.add('border-error');
    }

    if(this.status.trim() === ''){
      this.errorMessage += ' Не указан статус.';
      this.isValid = false;
      document.querySelector('input[name="status"]')?.classList.add('border-error');
    }
  }

  editIncident(event: Event){
    event.preventDefault();
    this.validation();
    console.log('UPDATE...');

    if(this.isValid){
      this.incidentStore$.dispatch(new IncidentEditAction({
        id: this.currentIncident.id,
        name: this.name,
        assignee: this.assignee? {id: this.assignee.id, fullname: this.assignee.fullname} : null,
        area: this.area,
        startDate: new Date(this.startDate),
        dueDate: new Date(this.dueDate),
        status: this.status,
      }));
      console.log(this.currentIncident.assignee);
      //удалить старое и добавить новое в userStore
      if(this.currentIncident.id !== this.assignee?.id){
        // если изменили исполнителя
        // то удаляем старый
        if(this.currentIncident.assignee !== null){
          this.userStore$.dispatch(new UserDeleteIncidentAction({
            id: this.currentIncident.assignee.id,
            incident: {
              id: this.currentIncident.id,
              name: this.currentIncident.name,
            }
          }));
        }
        // добавляем новый
        if(this.assignee !== null){
          this.userStore$.dispatch(new UserAddIncidentAction({
            id: this.assignee.id,
            incident: {
              id: this.currentIncident.id,
              name: this.name,
            }
          }))
        }
      }

    }
  }

}
