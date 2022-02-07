import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { SelectModule } from './modules/cdk/select/select.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { IncidentModule } from './modules/incident/incident.module';
import { IncidentEffects } from './modules/incident/store/incident.effects';

import { UserModule } from './modules/user/user.module';
import { UserEffects } from './modules/user/store/user.effects';

import { ProcessModule } from './modules/process/process.module';
import { ProcessEffects } from './modules/process/store/process.effects';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IncidentModule,
    HttpClientModule,
    ProcessModule,
    UserModule,
    SelectModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserEffects, IncidentEffects, ProcessEffects]),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
