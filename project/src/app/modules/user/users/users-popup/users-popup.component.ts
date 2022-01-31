import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/user.reducer';
import { UserCreateAction } from '../../store/user.actions';

@Component({
  selector: 'app-users-popup',
  templateUrl: './users-popup.component.html',
})
export class UsersPopupComponent implements OnInit {
  @Output() closeClicked = new EventEmitter();
  name: string = '';
  surname: string = '';
  lastname: string = '';
  login: string = '';
  dateOfBirth: string = '';
  position: string = '';
  isValid: boolean = true;
  errorMessage: string = '';


  constructor(private store$: Store<UserState>) { }

  closePopup(event: Event){
    event.preventDefault();
    this.cleanForm();
    this.closeClicked.emit();
  }

  validation(){
    this.isValid = true;
    this.errorMessage = '';

    if(this.name.trim() === ''){
      this.errorMessage += ' Не указано имя.';
      this.isValid = false;
      document.querySelector('input[name="name"]')?.classList.add('border-error');
    }
    else{
      if(!/^([а-яА-ЯёЁa-zA-Z\s]*)$/.test(this.name.trim())){
        this.errorMessage += ' Неверно указано имя.';
        this.isValid = false;
        document.querySelector('input[name="name"]')?.classList.add('border-error');
      }
    }

    if(this.surname.trim() === ''){
      this.errorMessage += ' Не указана фамилия.';
      this.isValid = false;
      document.querySelector('input[name="surname"]')?.classList.add('border-error');
    }
    else{
      if(!/^([а-яА-ЯёЁa-zA-Z\s]*)$/.test(this.name.trim())){
        this.errorMessage += ' Неверно указана фамилия.';
        this.isValid = false;
        document.querySelector('input[name="surname"]')?.classList.add('border-error');
      }
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
      this.store$.dispatch(new UserCreateAction({
        name: this.name,
        surname: this.surname,
        lastname: this.lastname,
        login: this.login,
        dateOfBirth: new Date(this.dateOfBirth),
        position: this.position,
        incidents: []
      }));
      this.cleanForm();
      this.closeClicked.emit();
    }
  }

  ngOnInit(): void {
  }


}
