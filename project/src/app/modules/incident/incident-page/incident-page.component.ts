import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Assignee } from '../model/assignee';
import { Incident } from '../model/incident';
import { IncidentState } from '../store/incident.reducer';
import { incidentListSelector } from '../store/incident.selector';
import { IncidentEditAction, IncidentLoadAction } from '../store/incident.actions';

import { User } from '../../user/model/user';
import { UserState } from '../../user/store/user.reducer';
import { userListSelector } from '../../user/store/user.selector';
import { UserAddIncidentAction, UserDeleteIncidentAction, UserLoadAction } from '../../user/store/user.actions';

import { ProcessState, Status } from '../../process/store/process.reducer';
import { processListSelector } from '../../process/store/process.selector';
import { ProcessLoadAction } from '../../process/store/process.actions';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IncidentService } from '../service/incident.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-incident-page',
  templateUrl: './incident-page.component.html',
})
export class IncidentPageComponent implements OnInit {
  incidents$: Observable<Incident[]> = this.incidentStore$.pipe(select(incidentListSelector));
  process$: Observable<Status[]> = this.processStore$.pipe(select(processListSelector));
  users$: Observable<User[]> = this.userStore$.pipe(select(userListSelector));

  incidentsData: Array<Incident> = [];
  currentIncident: Incident;
  usersForSearch: {_id: string, name: string}[] = [];
  selectData: string[] = [];

  name: string = '';
  area: string = '';
  startDate: string = '';
  dueDate: string = '';
  status: string = '';
  assignee: Assignee|null;
  initialAssignee: {_id: string, name: string};
  priority: string = '';
  description: string = '';


  constructor(
    private userStore$: Store<UserState>,
    private processStore$: Store<ProcessState>,
    private incidentStore$: Store<IncidentState>,
    private incidentService: IncidentService,

    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.processStore$.dispatch(new ProcessLoadAction);
    this.userStore$.dispatch(new UserLoadAction);
    this.incidentStore$.dispatch(new IncidentLoadAction);

    const id = this.route.snapshot.params.id;
    if(id.length === 24){
      this.incidentService.getIncident(id).subscribe(incident => {
        if(incident){
          this.currentIncident = incident;

          this.name = this.currentIncident.name;
          this.assignee = this.currentIncident.assignee;
          this.area = this.currentIncident.area;
          this.dueDate = this.setDate(this.currentIncident.dueDate);
          this.startDate = this.setDate(this.currentIncident.startDate);
          this.status = this.currentIncident.status;
          this.description = this.currentIncident.description;
          this.priority = this.currentIncident.priority;

          this.process$.subscribe((process)=>{
            process.find(item => item.status === this.currentIncident.status)?.toStatus.forEach((status)=>{
              this.selectData.push(status);
            })
          })
          this.selectData.push(this.currentIncident.status);

          if(this.currentIncident.assignee !== null){
            this.initialAssignee = Object.create({
              id: this.currentIncident.assignee?._id,
              name: `${this.currentIncident.assignee?.fullname.surname} ${this.currentIncident.assignee?.fullname.name} ${this.currentIncident.assignee?.fullname.lastname}`,
            })
          }
        }
        else{
          this.router.navigate(['not-found']);
        }
      });
    }
    else{
      this.router.navigate(['not-found']);
    }


    this.users$.subscribe((users)=>{
      // в будущем можно вставить проверку на пороф пригодность
      this.usersForSearch = users.map(item => {
        return {
          _id: item._id,
          name: `${item.fullname.surname} ${item.fullname.name} ${item.fullname.lastname}`,
        }
      })
    })
  }

  setDate(date: Date){
    date = new Date(date);
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  onSelectStatus(status: string){
    this.status = status;
  }

  onSelectAssignee(id: string){
    this.users$.subscribe((users)=>{
      let user = users.find(item => item._id === id);
      if(user){
        this.assignee = user;
      }
    })
  }

  isValid: boolean = true;
  errorMessage: string = '';
  saveMessage: boolean = false;

  validation(){
    this.isValid = true;
    this.errorMessage = '';

    // if(this.name.trim() === ''){
    //   this.errorMessage += ' Не указано название инцидента.';
    //   this.isValid = false;
    //   document.querySelector('input[name="name"]')?.classList.add('border-error');
    // }

    // if(this.area.trim() === ''){
    //   this.errorMessage += ' Не указана область.';
    //   this.isValid = false;
    //   document.querySelector('input[name="area"]')?.classList.add('border-error');
    // }

    // if(this.startDate.trim() === ''){
    //   this.errorMessage += ' Не указана дата начала.';
    //   this.isValid = false;
    //   document.querySelector('input[name="startdate"]')?.classList.add('border-error');
    // }

    if(this.dueDate.trim() === ''){
      this.errorMessage += ' Не указана дедлайн.';
      this.isValid = false;
      document.querySelector('input[name="dueDate"]')?.classList.add('border-error');
    }
    else{
      if(new Date(this.dueDate) < new Date()){
        this.errorMessage += ' Дата дедлайна меньше текущей даты.';
        this.isValid = false;
        document.querySelector('input[name="duedate"]')?.classList.add('border-error');
      }
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

    if(this.isValid){
      this.incidentStore$.dispatch(new IncidentEditAction({
        _id: this.currentIncident._id,
        name: this.name,
        assignee: this.assignee? {_id: this.assignee._id, fullname: this.assignee.fullname} : null,
        area: this.area,
        startDate: new Date(this.startDate),
        dueDate: new Date(this.dueDate),
        status: this.status,
        priority: this.priority,
        description: this.description,
      }));
      //удалить старое и добавить новое в userStore
      if(this.currentIncident._id !== this.assignee?._id){
        // если изменили исполнителя
        // то удаляем старый
        if(this.currentIncident.assignee !== null){
          this.userStore$.dispatch(new UserDeleteIncidentAction({
            _id: this.currentIncident.assignee._id,
            incident: {
              _id: this.currentIncident._id,
              name: this.currentIncident.name,
            }
          }));
        }
        // добавляем новый
        if(this.assignee !== null){
          this.userStore$.dispatch(new UserAddIncidentAction({
            _id: this.assignee._id,
            incident: {
              _id: this.currentIncident._id,
              name: this.name,
            }
          }))
        }
      }
      this.saveMessage = true;
      setTimeout(()=>{this.saveMessage = false}, 2000);
    }
  }
}
