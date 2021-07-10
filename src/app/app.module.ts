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
import {FlexLayoutModule} from '@angular/flex-layout';


import { WelcomeScreenComponent } from './welcome-screen/welcome-screen/welcome-screen.component';
import { LoginComponent } from './welcome-screen/welcome-screen/login/login.component';
import { RegisterComponent } from './welcome-screen/welcome-screen/register/register.component';
import { GuestComponent } from './guest/guest.component';
import { AgentComponent } from './agent/agent.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { AdminComponent } from './admin/admin.component';
import { AddRealEstateComponent } from './registered-user/add-real-estate/add-real-estate.component';


import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { ChangePersonalInfoComponent } from './registered-user/change-personal-info/change-personal-info.component';
import { RealEstateInfoComponent } from './real-estate-info/real-estate-info.component';
import { MyRealEstatesComponent } from './registered-user/my-real-estates/my-real-estates.component';



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
    AddRealEstateComponent,
    ChangePersonalInfoComponent,
    RealEstateInfoComponent,
    MyRealEstatesComponent
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
    MatRadioModule,
    FlexLayoutModule,
    GalleryModule,
    LightboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
