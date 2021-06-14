import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';


import { WelcomeScreenComponent } from './welcome-screen/welcome-screen/welcome-screen.component';
import { LoginComponent } from './welcome-screen/welcome-screen/login/login.component';
import { RegisterComponent } from './welcome-screen/welcome-screen/register/register.component';
import { GuestComponent } from './guest/guest.component';
import { AgentComponent } from './agent/agent.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { AdminComponent } from './admin/admin.component';
import { AddRealEstateComponent } from './registered-user/add-real-estate/add-real-estate.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    LoginComponent,
    RegisterComponent,
    GuestComponent,
    AgentComponent,
    RegisteredUserComponent,
    AdminComponent,
    AddRealEstateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
