import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private router: Router, private logRegService : LogRegService) {
    this.percent = parseInt(localStorage.getItem('percent'));
  }

  addRealEstateFlag: boolean = false;
  realEstateRequestsFlag: boolean = false;
  promoteFlag: boolean = false;
  offersFlag : boolean = false;
  statisticsFlag : boolean = true;
  changePassFlag : boolean = false;
  percent;

  ngOnInit(): void {
  }

  promote(){
    this.changePassFlag = false;
    this.statisticsFlag = false;
    this.offersFlag = false;
    this.realEstateRequestsFlag = false;
    this.addRealEstateFlag = false;
    this.promoteFlag = true;
  }

  addRealEstate() {
    this.changePassFlag = false;
    this.statisticsFlag = false;
    this.offersFlag = false;
    this.realEstateRequestsFlag = false;
    this.promoteFlag = false;
    this.addRealEstateFlag = true;
  }

  realEstateRequests() {
    this.changePassFlag = false;
    this.statisticsFlag = false;
    this.offersFlag = false;
    this.addRealEstateFlag = false;
    this.promoteFlag = false;
    this.realEstateRequestsFlag = true;
  }

  offers(){
    this.changePassFlag = false;
    this.statisticsFlag = false;
    this.addRealEstateFlag = false;
    this.promoteFlag = false;
    this.realEstateRequestsFlag = false;
    this.offersFlag = true;
  }

  statistics(){
    this.changePassFlag = false;
    this.addRealEstateFlag = false;
    this.promoteFlag = false;
    this.realEstateRequestsFlag = false;
    this.offersFlag = false;
    this.statisticsFlag = true;
  }

  changePassword(){
    this.addRealEstateFlag = false;
    this.promoteFlag = false;
    this.realEstateRequestsFlag = false;
    this.offersFlag = false;
    this.statisticsFlag = false;
    this.changePassFlag = true;
  }

  logout() {
    this.logRegService.logout();
  }

}
