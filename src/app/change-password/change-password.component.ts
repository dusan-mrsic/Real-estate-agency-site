import { Component, OnInit } from '@angular/core';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private logRegService : LogRegService) { }

  ngOnInit(): void {
  }

  oldP : string;
  newP : string;
  confirmP : string;

  changePassword(){
    this.logRegService.changePassword(this.logRegService.getLastLoggeduserName(), this.oldP, this.newP, this.confirmP);
  }

}
