import { Component, OnInit } from '@angular/core';
import { RealEstate } from 'src/app/registered-user/add-real-estate/RealEstate.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';
import { User } from 'src/app/welcome-screen/welcome-screen/user.model';

@Component({
  selector: 'app-real-estate-requests',
  templateUrl: './real-estate-requests.component.html',
  styleUrls: ['./real-estate-requests.component.css']
})
export class RealEstateRequestsComponent implements OnInit {

  constructor(private logRegService: LogRegService) {
    this.logRegService.getAllEstateRequests().subscribe(estate =>{
      this.estateRequests = estate;
      console.log(this.estateRequests);
    })
  }

  estateRequests : Array<RealEstate> = [];
  panelOpenState = false;

  ngOnInit(): void {
  }

  acceptEstate(estate){
    this.logRegService.acceptEstate(estate.description);
  }

  declineEstate(estate){
    this.logRegService.deleteEstate(estate.description);
  }

}
