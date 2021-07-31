import { Component, OnInit } from '@angular/core';
import { RealEstateOffer } from 'src/app/real-estate-info/RealEstateOffer.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private logRegService : LogRegService) {
    this.logRegService.getAllOffers(this.logRegService.getLastLoggeduserName()).subscribe(offers => {
      this.allOffers = offers;
    });
  }

  allOffers : Array<RealEstateOffer> = [];

  ngOnInit(): void {
  }

  acceptOffer(offer: RealEstateOffer){
    this.logRegService.acceptOffer(offer);
  }

  declineOffer(offer: RealEstateOffer){
    this.logRegService.declineOffer(offer);
  }

}
