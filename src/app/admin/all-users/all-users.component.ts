import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';
import { User } from 'src/app/welcome-screen/welcome-screen/user.model';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers : Array<User> = [];
  editUserFlag : boolean = false;
  user : User;
  file : File;
  previewOfImage : string;
  constructor(private logRegService : LogRegService) {
    this.logRegService.getAllUsers().subscribe(data => {
      this.allUsers = data;
    })
   }

  ngOnInit(): void {
  }

  editUser(user : User){
    this.user = user;
    this.editUserFlag = true;
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

  deleteUser(user : User){
    this.logRegService.deleteUser(user.username);
  }

}
