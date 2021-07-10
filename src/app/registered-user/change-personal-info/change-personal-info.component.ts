import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/welcome-screen/welcome-screen/user.model';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-change-personal-info',
  templateUrl: './change-personal-info.component.html',
  styleUrls: ['./change-personal-info.component.css']
})
export class ChangePersonalInfoComponent implements OnInit {

  constructor(private logRegService: LogRegService) {
    this.getUser();
    this.previewOfImage = this.user.image;
   }

  file : File;
  previewOfImage : string;
  user : User;

  ngOnInit(): void {

  }

  changePersonalInfo(form : NgForm){
    if(this.file != null)
      this.logRegService.changePersonalInfo(this.user._id, form.value.name, form.value.lastName, this.user.username, this.user.password ,form.value.email,form.value.city,form.value.state, this.file);
    else
      this.logRegService.changePersonalInfoWithNoImage(this.user._id, form.value.name, form.value.lastName, this.user.username, this.user.password ,form.value.email,form.value.city,form.value.state, this.user.image);

  }

  pickImage(ev : Event){
    this.file = (ev.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewOfImage = fileReader.result as string;
    };

    fileReader.readAsDataURL(this.file);
  }

  getUser(){
    this.user = this.logRegService.getLoggedUser();
  }

}
