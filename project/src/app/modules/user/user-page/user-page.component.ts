import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../model/user';
import { UserState } from '../store/user.reducer';
import { UserEditAction, UserLoadAction } from '../store/user.actions';
import { userListSelector } from '../store/user.selector';

import { IncidentState } from '../../incident/store/incident.reducer';
import { IncidentChangeAssigneeAction } from '../../incident/store/incident.actions';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from '../service/user.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less'],
})
export class UserPageComponent implements OnInit {
  users$: Observable<User[]> = this.userStore$.pipe(select(userListSelector));
  isOpenedIncidentSearch = false;
  usersData: Array<User> = [];
  currentUser: User;

  name: string;
  surname: string;
  lastname: string;
  login: string;
  position: string;
  dateOfBirth: string;
  incidents: {_id: string, name: string}[];


  setDate(date: Date){
    date = new Date(date);

    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  constructor(
    private userStore$: Store<UserState>,
    private userService: UserService,
    private incidentStore$: Store<IncidentState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userStore$.dispatch(new UserLoadAction);
    this.users$.subscribe((users) => {
      this.usersData = users;
    });

    const id = this.route.snapshot.params.id;
    if(id.length === 24){
      this.userService.getUser(id).subscribe((user)=> {
        if(user){
          this.currentUser = user;

          this.name = this.currentUser.fullname.name;
          this.surname = this.currentUser.fullname.surname;
          this.lastname = this.currentUser.fullname.lastname;
          this.login = this.currentUser.login;
          this.position = this.currentUser.position;
          this.dateOfBirth = this.setDate(this.currentUser.dateOfBirth);
          this.incidents = this.currentUser.incidents;
        }
        else{
          this.router.navigate(['not-found']);
        }
      })
    }
    else{
      this.router.navigate(['not-found']);
    }
  }

  updateIncidents(newIncidentsArray: {_id: string, name: string}[]){
    this.incidents = newIncidentsArray;
  }

  isValid: boolean = true;
  errorMessage: string = '';
  saveMessage: boolean = false;


  validation(){
    this.isValid = true;
    this.errorMessage = '';

    if(this.name.trim() === ''){
      this.errorMessage += ' Не указано имя.';
      this.isValid = false;
      document.querySelector('input[name="name"]')?.classList.add('border-error');
    }

    if(this.surname.trim() === ''){
      this.errorMessage += ' Не указана фамилия.';
      this.isValid = false;
      document.querySelector('input[name="surname"]')?.classList.add('border-error');
    }

    if(this.position.trim() === ''){
      this.errorMessage += ' Не указана должность.';
      this.isValid = false;
      document.querySelector('input[name="position"]')?.classList.add('border-error');
    }

    if(this.dateOfBirth.trim() === ''){
      this.errorMessage += ' Не указана дата рождения.';
      this.isValid = false;
      document.querySelector('input[name="dateOfBirth"]')?.classList.add('border-error');
    }

    if(this.login.trim() === ''){
      this.errorMessage += ' Не указан логин.';
      this.isValid = false;
      document.querySelector('input[name="login"]')?.classList.add('border-error');
    }
  }

  onSubmit(event: Event){
    event.preventDefault();
    this.validation();
    console.log('UPDATE...');

    if(this.isValid){
      console.log(this.incidents);
      // добавить изменения пользователя
      this.userStore$.dispatch(new UserEditAction({
        _id: this.currentUser._id,
        fullname: {
          name: this.name,
          surname: this.surname,
          lastname: this.lastname
        },
        login: this.login,
        position: this.position,
        dateOfBirth: new Date(this.dateOfBirth),
        incidents: this.incidents
      }));
      // поменять у инцидентов исполнителей
      this.incidents?.forEach(item => {

        this.incidentStore$.dispatch(new IncidentChangeAssigneeAction({
          _id: item._id,
          assignee: {
            _id: this.currentUser._id,
            fullname: {
              name: this.name,
              surname: this.surname,
              lastname: this.lastname
            }
          }
        }));
      })
      this.saveMessage = true;
      setTimeout(()=>{this.saveMessage = false}, 2000);
    }
  }
}
