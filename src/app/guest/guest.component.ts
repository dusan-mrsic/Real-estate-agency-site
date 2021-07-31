import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Lightbox } from 'ng-gallery/lightbox';
import { RealEstate } from '../registered-user/add-real-estate/RealEstate.model';
import { GuestService } from './guest.service';

import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(public gallery: Gallery, public lightbox: Lightbox,private guestService : GuestService, private router : Router) { }

  items: GalleryItem[];
  promoted : Array<RealEstate> = [];

  ngOnInit() {
    this.guestService.searchP("Beograd",0,100000000).subscribe((realEstate : Array<RealEstate>)=> {
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
  }

  realEstates : Array<RealEstate> = [];
  message = "";

  logreg(){
    this.router.navigate([""]);
  }

  onSearch(form: NgForm){
    if(!form.value.city && !form.value.priceMin && !form.value.priceMax){
      this.message = "Please insert at least one field!";
      this.realEstates = [];
      return;
    }
    this.message="";
    this.guestService.search(form.value.city,form.value.priceMin,form.value.priceMax).subscribe((realEstate : Array<RealEstate>)=> {
      this.realEstates = realEstate;
  });
}
}
