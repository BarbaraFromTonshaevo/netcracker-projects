import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidentPageModule } from './incident-page/incident-page.module';
import { IncidentsModule } from './incidents/incidents.module';
import { ProcessModule } from './process/process.module';
import { UserPageModule } from './user-page/user-page.module';
import { UsersModule } from './users/users.module';

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
