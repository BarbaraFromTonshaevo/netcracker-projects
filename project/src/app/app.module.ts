import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentPageModule } from './modules/incident/incident-page/incident-page.module';
import { IncidentsModule } from './modules/incident/incidents/incidents.module';
import { ProcessModule } from './modules/process/process.module';
import { UserPageModule } from './modules/user/user-page/user-page.module';
import { UsersModule } from './modules/user/users/users.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IncidentsModule,
    ProcessModule,
    UsersModule,
    IncidentPageModule,
    UserPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
