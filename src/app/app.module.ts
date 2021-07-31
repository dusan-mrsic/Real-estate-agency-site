import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';



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
import { AddUserComponent } from './admin/add-user/add-user.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { RealEstateRequestsComponent } from './admin/real-estate-requests/real-estate-requests.component';
import { RegistrationRequestsComponent } from './admin/registration-requests/registration-requests.component';
import { AddEstateComponent } from './admin/add-estate/add-estate.component';
import { SalesPercentComponent } from './admin/sales-percent/sales-percent.component';
import { PromoteComponent } from './agent/promote/promote.component';
import { OffersComponent } from './registered-user/offers/offers.component';
import { ConfirmOffersComponent } from './agent/confirm-offers/confirm-offers.component';
import { ChartsComponent } from './charts/charts.component';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error-interceptor';
import { ChangePasswordComponent } from './change-password/change-password.component';



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
    MyRealEstatesComponent,
    AddUserComponent,
    AllUsersComponent,
    RealEstateRequestsComponent,
    RegistrationRequestsComponent,
    AddEstateComponent,
    SalesPercentComponent,
    PromoteComponent,
    OffersComponent,
    ConfirmOffersComponent,
    ChartsComponent,
    ErrorComponent,
    ChangePasswordComponent
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
    LightboxModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
