import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserState } from '../store/user.reducer';
import { Observable } from 'rxjs';
import { userListSelector } from '../store/user.selector';
import { IncidentState } from '../../incident/store/incident.reducer';
import { UserEditAction } from '../store/user.actions';
import { NgForm } from '@angular/forms';
import { IncidentChangeAssigneeAction } from '../../incident/store/incident.actions';

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
  incidents: {id: number, name: string}[]|null;


  setDate(date: Date){
    return date.getFullYear() +'-'+
    ((date.getMonth() + 1) < 10 ? '0'+(date.getMonth()+1): date.getMonth()+1)+'-'+
    (date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
  }

  constructor(
    private userStore$: Store<UserState>,
    private incidentStore$: Store<IncidentState>,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.usersData = users;
    });
    this.usersData;

    const id = +this.route.snapshot.params.id;
    let newUser = this.usersData.find(x => x.id === id);
    if(newUser){
      this.currentUser = newUser;

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
  }

  updateIncidents(newIncidentsArray: {id: number, name: string}[]|null){
    this.incidents = newIncidentsArray;
  }

  isValid: boolean = true;
  errorMessage: string = '';

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
      this.userStore$.dispatch(new UserEditAction({
        id: this.currentUser.id,
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
      // пройти по this.incidents
      this.incidents?.forEach(item => {
        this.incidentStore$.dispatch(new IncidentChangeAssigneeAction({
          id: item.id,
          assignee: {
            id: this.currentUser.id,
            fullname: {
              name: this.name,
              surname: this.surname,
              lastname: this.lastname
            }
          }
        }));
        // в incidentStore по id поменять содержание
      })
      // произвести проверку все ли устарелые инциденты удалили текущего исполнителя и добавили ли к новым инцидентам текущего исполнителя
      //вывести сообщение что изменения сохранены
    }
  }
}
