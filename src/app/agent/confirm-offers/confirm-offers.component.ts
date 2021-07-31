import { Component, OnInit } from '@angular/core';
import { RealEstateOffer } from 'src/app/real-estate-info/RealEstateOffer.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-confirm-offers',
  templateUrl: './confirm-offers.component.html',
  styleUrls: ['./confirm-offers.component.css']
})
export class ConfirmOffersComponent implements OnInit {

  constructor(private logRegService : LogRegService) {
    this.logRegService.getAllOffersAgent().subscribe(offers => {
      this.allOffers = offers;
    })
    this.percent = parseInt(localStorage.getItem('percent'));
  }
  percent;
  allOffers : Array<RealEstateOffer> = [];

  ngOnInit(): void {
  }

  confirmOffer(offer: RealEstateOffer){
    this.logRegService.confirmOffer(offer);
  }

  acceptOffer(offer: RealEstateOffer){
    this.logRegService.acceptOffer(offer);
  }

  declineOffer(offer: RealEstateOffer){
    this.logRegService.declineOffer(offer);
  }


}
