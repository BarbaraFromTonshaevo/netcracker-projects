import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incident-popup',
  template: `
  <div class="popup">
    <div class="popup__body">
      <form action="" class="popup__form">
        <button class="popup__close" (click)="closePopup($event)">X</button>
        <h2 class="popup__heading">Новый инцидент</h2>
        <div class="popup__info">
          <label class="popup__label label">Название инцидента*</label>
          <input class="popup__input input" type="text" name="name">
          <label class="popup__label label">Исполнитель</label>
          <input class="popup__input input" type="text" name="assignee">
          <label class="popup__label label">Область*</label>
          <input class="popup__input input" type="text" name="area">
          <label class="popup__label label">Дедлайн*</label>
          <input class="popup__input input" type="date" name="duedate">
        </div>
        <button class="popup__save btn-purple" name="update">Сохранить</button>
        <button class="popup__cancel btn-line" name="cancel" (click)="closePopup($event)">Отмена</button>
      </form>
    </div>
  </div>
  `,
})
export class IncidentPopupComponent implements OnInit {
  @Output() closeClicked = new EventEmitter();

  closePopup($event: Event){
    $event.preventDefault();
    console.log('close');
    this.closeClicked.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
