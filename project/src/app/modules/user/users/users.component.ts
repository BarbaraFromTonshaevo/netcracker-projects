import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
// import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {User} from '../model/user';
import { UserState } from '../store/user.reducer';
import { userListSelector } from '../store/user.selector';
import { UserDeleteAction, UserLoadAction } from '../store/user.actions';
import { IncidentState } from '../../incident/store/incident.reducer';
import { IncidentChangeAssigneeAction } from '../../incident/store/incident.actions';

// @UntilDestroy()
// @Component({})
// export class InboxComponent {
//   ngOnInit() {
//     interval(1000).pipe(untilDestroyed(this)).subscribe();
//   }
// }

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  // users$: Observable<User[]> = this.userStore$.pipe(select(userListSelector));
  users: User[] = [];
  isOpenedPopup = false;
  constructor(
    private router: Router,
    private userStore$: Store<UserState>,
    private incidentStore$: Store<IncidentState>
  ) { }

  addUser(){
    this.isOpenedPopup = true;
  }

  closeUserPopup($event: any){
    this.isOpenedPopup = false;
  }

  openUser(route: string){
    this.router.navigate([route]);
  }

  deleteUser(id: string){
    this.users.find(item=>item._id === id)?.incidents?.forEach(incident => {
      console.log(`Delete assignee ${id} from incident ${incident._id}  ${incident.name}`);
      this.incidentStore$.dispatch(new IncidentChangeAssigneeAction({id: incident._id, assignee: null}));
    })
    this.userStore$.dispatch(new UserDeleteAction(id));
  }

  ngOnInit(): void {
    this.userStore$.dispatch(new UserLoadAction);
    this.userStore$.pipe(select(userListSelector)).subscribe(users=>{
      this.users = users;
    })
  }

}
