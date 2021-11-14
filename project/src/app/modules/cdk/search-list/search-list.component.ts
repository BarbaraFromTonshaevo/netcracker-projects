import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../user/model/user';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../user/store/user.reducer';
import { Observable } from 'rxjs';
import { userListSelector } from '../../user/store/user.selector';

type listSize = 'defult' | 'small';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.less']
})
export class SearchListComponent implements OnInit {
  @Output() select = new EventEmitter<User>();
  @Input() initialAssignee: {id: number, fullname: {name: string, surname: string, lastname: string}} | null;
  @Input() size: listSize = 'defult';
  innerSize: listSize = 'defult';
  searchList: User[];
  usersList: User[];
  searchControl: FormControl;

  users$: Observable<User[]> = this.store$.pipe(select(userListSelector));


  constructor(
    private store$: Store<UserState>,
  ) { }

  selectAssignee(event: Event, user: User){
    event.preventDefault();
    this.select.emit(user);
    this.searchControl.setValue(`${user.fullname.surname} ${user.fullname.name} ${user.fullname.lastname}`);
  }

  ngOnInit(): void {
    this.users$.subscribe((users) => {
      this.usersList = users;
    });
    let startAssigneeValue = this.initialAssignee ? `${this.initialAssignee?.fullname.surname} ${this.initialAssignee?.fullname.name} ${this.initialAssignee?.fullname.lastname}` : '';
    this.searchControl = new FormControl(startAssigneeValue);

    this.searchControl.valueChanges.subscribe((value) => {
      if(value.trim().toLowerCase() !== ''){
        this.searchList = this.usersList.filter(item =>
        (item.fullname.surname.toLocaleLowerCase() +
        item.fullname.name.toLocaleLowerCase() +
        item.fullname.lastname.toLocaleLowerCase()).includes(value.trim().toLowerCase()));
      }
      else{
        this.searchList = [];
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void{
    const {size} = changes;
    if(size && size.currentValue){
      this.innerSize = size.currentValue;
    }
  }
}
