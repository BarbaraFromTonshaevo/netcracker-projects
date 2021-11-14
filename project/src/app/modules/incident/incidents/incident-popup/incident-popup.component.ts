import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/modules/user/model/user';
import { select, Store } from '@ngrx/store';
import { IncidentState } from '../../store/incident.reducer';
import { IncidentCreateAction } from '../../store/incident.actions';

@Component({
  selector: 'app-incident-popup',
  templateUrl: './incident-popup.component.html',
})
export class IncidentPopupComponent implements OnInit {
  @Output() closeClicked = new EventEmitter();
  name: string = '';
  area: string = '';
  duedate: string = '';
  assignee: User|null = null;
  isValid: boolean = true;
  errorMessage: string;

  closePopup($event: Event){
    $event.preventDefault();
    this.closeClicked.emit();
  }

  onSelectAssignee(user: User){
    this.assignee = user;
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
      this.store$.dispatch(new IncidentCreateAction({
        name: this.name,
        area: this.area,
        startDate: new Date(),
        dueDate: new Date(this.duedate),
        assignee: this.assignee
      }));
      this.cleanForm();
      this.closeClicked.emit();
    }

  }

  constructor(private store$: Store<IncidentState>) { }

  ngOnInit(): void {
  }

}
