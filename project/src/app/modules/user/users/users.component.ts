import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {User} from '../model/user';
import { UserState } from '../store/user.reducer';
import { userListSelector } from '../store/user.selector';
import { UserDeleteAction } from '../store/user.actions';
import { UserSyncStorageService } from '../service/user-sync-storage.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> = this.store$.pipe(select(userListSelector));

  isOpenedPopup = false;
  constructor(
    private store$: Store<UserState>,
    private router: Router,
    private userSyncStorage: UserSyncStorageService,
  ) { }

  addUser(){
    this.isOpenedPopup = true;
  }

  closeUserPopup($event: any){
    console.log('closeIncidentPopup');
    this.isOpenedPopup = false;
  }

  openUser(route: string){
    this.router.navigate([route]);
  }

  deleteUser(id: number){
    this.store$.dispatch(new UserDeleteAction({id}));
  }

  ngOnInit(): void {
    this.userSyncStorage.init();
  }

}
