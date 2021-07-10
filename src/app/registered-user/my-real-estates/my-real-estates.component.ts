import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';
import { RealEstate } from '../add-real-estate/RealEstate.model';

@Component({
  selector: 'app-my-real-estates',
  templateUrl: './my-real-estates.component.html',
  styleUrls: ['./my-real-estates.component.css']
})
export class MyRealEstatesComponent implements OnInit {

  username : string;
  myEstates : Array<RealEstate>;
  editEstateFlag : boolean = false;
  estate : RealEstate;

  constructor(private logRegService : LogRegService) {
    this.username = this.logRegService.getLastLoggeduserName();

    this.logRegService.searchMyEstates(this.username).subscribe((realEstate: Array<RealEstate>) => {
      this.myEstates = realEstate;
      console.log(this.myEstates);
    })

  }

  editEstate(estate : RealEstate){
    this.editEstateFlag = true;
    this.estate = estate;
  }

  ngOnInit(): void {
  }

  saveChanges(form : NgForm){
    this.logRegService.changeRealEstate(this.estate._id, form.value.description,form.value.city, form.value.municipality, form.value.address, form.value.houseOrApartment, form.value.house,'0','0',
       this.estate.images ,form.value.quadrature, form.value.rooms, form.value.furnished, form.value.forRent,form.value.price,form.value.owner, this.logRegService.getLastLoggeduserName());
  }

}
