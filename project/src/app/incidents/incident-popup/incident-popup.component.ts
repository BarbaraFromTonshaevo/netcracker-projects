import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incident-popup',
  template: `
  <div class="popup">
    <div class="popup__body">
      <form action="" class="popup__form">
        <button class="popup__close" (click)="closePopup($event)">X</button>
        <h2 class="popup__heading">Новый инцидент</h2>
        <div class="popup__info">
          <label class="popup__label">Название инцидента*</label>
          <input class="popup__input" type="text" name="surname">
          <label class="popup__label">Исполнитель</label>
          <input class="popup__input" type="text" name="name">
          <label class="popup__label">Область*</label>
          <input class="popup__input" type="text" name="lastname">
          <label class="popup__label">Дедлайн*</label>
          <input class="popup__input" type="date" name="calendar">
        </div>
        <button class="popup__save btn-purple" name="update">Сохранить</button>
        <button class="popup__cancel btn-line" name="cancel">Отмена</button>
      </form>
    </div>
  </div>
  `,
})
export class IncidentPopupComponent implements OnInit {

  closePopup($event: Event){
    $event.preventDefault();
    console.log('close');
  }
  constructor() { }

  ngOnInit(): void {
  }

}
