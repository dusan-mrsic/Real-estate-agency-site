import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, OnInit } from '@angular/core';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';
import { User } from 'src/app/welcome-screen/welcome-screen/user.model';

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit {

  constructor(private logRegService: LogRegService) {
    this.logRegService.getAllUserRequests().subscribe(user =>{
      this.userRequests = user;
      console.log(this.userRequests);
    })
  }

  userRequests : Array<User> = [];
  panelOpenState = false;

  ngOnInit(): void {
  }

  acceptUser(user){
    this.logRegService.acceptUser(user.username);
  }

  declineUser(user){
    this.logRegService.deleteUser(user.username);
  }


}
