import { Component, OnInit } from '@angular/core';
import { RealEstate } from 'src/app/registered-user/add-real-estate/RealEstate.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-promote',
  templateUrl: './promote.component.html',
  styleUrls: ['./promote.component.css']
})
export class PromoteComponent implements OnInit {

  allEstates : Array<RealEstate> = [];
  constructor(private logRegService : LogRegService) {
    this.logRegService.getAllEstates().subscribe(realEstates => {
      this.allEstates = realEstates;
    })
  }

  ngOnInit(): void {

  }

  promote(estate : RealEstate){
    this.logRegService.promote(estate.description).subscribe(res => {

    });
  }

  unpromote(estate : RealEstate){
    this.logRegService.unpromote(estate.description).subscribe(res => {

    });
  }

}
