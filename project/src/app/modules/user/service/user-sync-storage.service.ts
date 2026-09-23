import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {filter} from 'rxjs/operators'

import { UserState } from '../store/user.reducer';
import { userFeatureSelector } from '../store/user.selector';
import { UserLoadStateAction } from '../store/user.actions';

export const USER_LOCALSTORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class UserSyncStorageService {
  private isInit = false;
  constructor(private store$: Store<UserState>) { }

  init(){
    if(this.isInit){
      return;
    }

    this.isInit = true;
    this.loadFromStorage();
    this.store$.pipe(
      select(userFeatureSelector),
      filter(state => !!state)
      ).subscribe(state => {
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(state));
    });

    window.addEventListener('storage', () => {
      this.loadFromStorage();
    });
  }

  private loadFromStorage(){
    const storageState = localStorage.getItem(USER_LOCALSTORAGE_KEY);
    if(storageState){
      this.store$.dispatch(new UserLoadStateAction({state: JSON.parse(storageState)}));
    }
  }
}
