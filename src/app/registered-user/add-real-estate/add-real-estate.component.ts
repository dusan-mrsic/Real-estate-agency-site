import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegService.service';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.css']
})
export class AddRealEstateComponent implements OnInit {

  images : FileList;
  previewOfImage : string;
  valueOfApartment;

  constructor(private userService : LogRegService) { }

  ngOnInit(): void {
  }

  onAddRealEsate(form : NgForm){
    this.userService.addRealEstate(form.value.description, form.value.address, form.value.houseOrApartment, form.value.house,form.value.apartment1,form.value.apartment2,
       this.images,form.value.quadrature, form.value.rooms, form.value.furnished, form.value.forRent,form.value.price,form.value.owner);
  }

  pickImages(ev : Event){

    this.images = (ev.target as HTMLInputElement).files;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewOfImage = fileReader.result as string;
    };
    //fileReader.readAsDataURL(this.file);
  }

}
