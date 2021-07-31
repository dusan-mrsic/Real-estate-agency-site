import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { GuestService } from '../guest/guest.service';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service';
import { User } from '../welcome-screen/welcome-screen/user.model';
import { RealEstate } from './add-real-estate/RealEstate.model';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit {

  constructor(public gallery: Gallery, public lightbox: Lightbox, private guestService: GuestService, private logRegService : LogRegService, private router : Router) { }

  items: GalleryItem[];
  promoted: Array<RealEstate> = [];
  user : User;

  //flags
  addRealEstateFlag : boolean = false;
  changePersonalInfoFlag : boolean = false;
  realEstateInfoFlag : boolean = false;
  searchRealEstatesFlag : boolean = true;
  myRealEstatesFlag : boolean = false;
  offersFlag : boolean = false;
  changePassFlag : boolean = false;

  ngOnInit(): void {
    this.guestService.searchP("Beograd", 0, 100000000).subscribe((realEstate: Array<RealEstate>) => {
      this.promoted = realEstate;
      /** Basic Gallery Example */

      // Creat gallery items
      this.items = this.promoted.map(item => new ImageItem({ src: item.images[0], thumb: item.images[0] }));
      console.log(this.items);

      /** Lightbox Example */

      // Get a lightbox gallery ref
      const lightboxRef = this.gallery.ref('lightbox');

      // Add custom gallery config to the lightbox (optional)
      lightboxRef.setConfig({
        imageSize: ImageSize.Cover,
        thumbPosition: ThumbnailsPosition.Top
      });

      // Load items into the lightbox gallery ref
      lightboxRef.load(this.items);
    })

    this.getUser();

  }

  realEstates: Array<RealEstate> = [];
  message = "";
  onSearch(form: NgForm) {
    if (!form.value.city && !form.value.priceMin && !form.value.priceMax) {
      this.message = "Please insert at least one field!";
      this.realEstates = [];
      return;
    }
    this.message = "";
    this.guestService.search(form.value.city, form.value.priceMin, form.value.priceMax).subscribe((realEstate: Array<RealEstate>) => {
      this.realEstates = realEstate;
      console.log(this.realEstates);
    });
  }

  changePassword(){
    this.offersFlag = false;
    this.myRealEstatesFlag = false;
    this.realEstateInfoFlag = false;
    this.changePersonalInfoFlag = false;
    this.searchRealEstatesFlag = false;
    this.addRealEstateFlag = false;
    this.changePassFlag = true;
  }

  addRealEstate(){
    this.changePassFlag = false;
    this.offersFlag = false;
    this.myRealEstatesFlag = false;
    this.realEstateInfoFlag = false;
    this.changePersonalInfoFlag = false;
    this.searchRealEstatesFlag = false;
    this.addRealEstateFlag = true;
  }

  searchRealEstate(){
    this.changePassFlag = false;
    this.offersFlag = false;
    this.myRealEstatesFlag = false;
    this.myRealEstatesFlag = false;
    this.realEstateInfoFlag = false;
    this.changePersonalInfoFlag = false;
    this.addRealEstateFlag = false;
    this.searchRealEstatesFlag = true;
  }

  changePersonalInfo(){
    this.changePassFlag = false;
    this.offersFlag = false;
    this.myRealEstatesFlag = false;
    this.realEstateInfoFlag = false;
    this.addRealEstateFlag = false;
    this.searchRealEstatesFlag = false;
    this.changePersonalInfoFlag = true;
  }

  getUser(){
    this.logRegService.getUser();
   this.user =  this.logRegService.getLoggedUser();
  }

  realEstateInfo(estate : RealEstate){
    this.changePassFlag = false;
    this.offersFlag = false;
    this.myRealEstatesFlag = false;
    this.addRealEstateFlag = false;
    this.searchRealEstatesFlag = false;
    this.changePersonalInfoFlag = false;
    this.realEstateInfoFlag = true;

    this.logRegService.setRealEstateForInfo(estate);

  }

  myRealEstate(){
    this.changePassFlag = false;
    this.offersFlag = false;
    this.addRealEstateFlag = false;
    this.searchRealEstatesFlag = false;
    this.changePersonalInfoFlag = false;
    this.realEstateInfoFlag = false;
    this.myRealEstatesFlag = true;
  }

  myOffers(){
    this.changePassFlag = false;
    this.addRealEstateFlag = false;
    this.searchRealEstatesFlag = false;
    this.changePersonalInfoFlag = false;
    this.realEstateInfoFlag = false;
    this.myRealEstatesFlag = false;
    this.offersFlag = true;
  }

  logout(){
    this.logRegService.logout();
  }
}
