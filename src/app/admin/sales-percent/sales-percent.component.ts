import { Component, OnInit } from '@angular/core';
import { RealEstateOffer } from 'src/app/real-estate-info/RealEstateOffer.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-sales-percent',
  templateUrl: './sales-percent.component.html',
  styleUrls: ['./sales-percent.component.css']
})
export class SalesPercentComponent implements OnInit {

  constructor(private logRegService: LogRegService) {
    this.percent = localStorage.getItem('percent');
    this.percent1 = parseInt(localStorage.getItem('percent'));
    this.logRegService.getAllOffersAgent().subscribe(offers => {
      this.allOffers = offers;
      this.allOffers.forEach(offer => {
        if(offer.accepted == 2)
        this.income = this.income + (offer.price / 100) * this.percent1;
      })
    })

  }

  percent : string;
  percent1;
  income : number = 0;
  allOffers : Array<RealEstateOffer> = [];
  ngOnInit(): void {
  }

  savePercent(){
    //console.log(localStorage.getItem('percent'));
    localStorage.setItem('percent', this.percent);
    //console.log(localStorage.getItem('percent'));
  }

}
