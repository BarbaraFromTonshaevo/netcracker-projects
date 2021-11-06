import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-popup',
  template: `
    <div class="popup">
    <div class="popup__body">
      <form action="" class="popup__form">
        <button class="popup__close" (click)="closePopup($event)">X</button>
        <h2 class="popup__heading">Новый инцидент</h2>
        <div class="popup__info">
          <label class="popup__label label">Имя*</label>
          <input class="popup__input input" type="text" name="name">
          <label class="popup__label label">Фамилия*</label>
          <input class="popup__input input" type="text" name="surname">
          <label class="popup__label label">Отчество*</label>
          <input class="popup__input input" type="text" name="lastname">
          <label class="popup__label label">Логин*</label>
          <input class="popup__input input" type="text" name="login">
          <label class="popup__label label">Дата рождения*</label>
          <input class="popup__input input" type="date" name="dateOfBirth">
          <label class="popup__label label">Досжность*</label>
          <input class="popup__input input" type="text" name="position">
        </div>
        <button class="popup__save btn-purple" name="update">Сохранить</button>
        <button class="popup__cancel btn-line" name="cancel" (click)="closePopup($event)">Отмена</button>
      </form>
    </div>
  </div>
  `,
})
export class UsersPopupComponent implements OnInit {
  @Output() closeClicked = new EventEmitter();

  constructor() { }

  closePopup($event: Event){
    $event.preventDefault();
    console.log('close');
    this.closeClicked.emit();
  }

  ngOnInit(): void {
  }

}
