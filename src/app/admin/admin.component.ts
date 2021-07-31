import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private logRegService: LogRegService) { }

  addUserFlag: boolean = false;
  addRealEstateFlag: boolean = false;
  allUsersFlag: boolean = false;
  registrationRequestsFlag: boolean = false;
  realEstateRequestsFlag: boolean = false;
  salesPercentFlag: boolean = false;
  chartsFlag : boolean = true;
  changePassFlag : boolean = false;


  ngOnInit(): void {
  }

  addUser() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.addUserFlag = true;
  }

  addRealEstate() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addUserFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.addRealEstateFlag = true;
  }

  allUsers() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.allUsersFlag = true;
  }

  registrationRequests() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.registrationRequestsFlag = true;
  }

  realEstateRequests() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.salesPercentFlag = false;
    this.realEstateRequestsFlag = true;
  }

  salesPercent() {
    this.changePassFlag = false;
    this.chartsFlag = false;
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = true;
  }

  charts(){
    this.changePassFlag = false;
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.chartsFlag = true;
  }

  changePassword(){
    this.addUserFlag = false;
    this.addRealEstateFlag = false;
    this.allUsersFlag = false;
    this.registrationRequestsFlag = false;
    this.realEstateRequestsFlag = false;
    this.salesPercentFlag = false;
    this.chartsFlag = false;
    this.changePassFlag = true;
  }




  logout() {
    this.logRegService.logout();
  }

}
