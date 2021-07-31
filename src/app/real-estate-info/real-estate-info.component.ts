import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { RealEstate } from '../registered-user/add-real-estate/RealEstate.model';
import { LogRegService } from '../welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-real-estate-info',
  templateUrl: './real-estate-info.component.html',
  styleUrls: ['./real-estate-info.component.css']
})
export class RealEstateInfoComponent implements OnInit {


  estate : RealEstate;
  items: GalleryItem[];
  images : Array<string>;
  constructor(private logRegService : LogRegService, public gallery: Gallery) {
    this.estate = logRegService.getRealEstateForInfo();
    console.log(this.estate);
    this.images = this.estate.images;
  }

  ngOnInit(): void {

    this.items = this.images.map(item => new ImageItem({ src: item}));
    console.log(this.items);

    const lightboxRef = this.gallery.ref('lightbox');


    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });


    lightboxRef.load(this.items);
  }

  giveOffer(estate : RealEstate){
    this.logRegService.addOffer(estate._id,estate.description, estate.price, estate.images[0], estate.username,this.logRegService.getLastLoggeduserName());
  }

}
