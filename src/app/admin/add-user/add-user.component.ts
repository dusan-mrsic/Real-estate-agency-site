import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from 'src/app/welcome-screen/welcome-screen/LogRegAddEstateService.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  file : File;
  previewOfImage : string;

  constructor(private logRegService: LogRegService) { }

  ngOnInit(): void {
  }

  onRegister(form : NgForm){
    this.logRegService.register(form.value.name, form.value.lastName, form.value.username, form.value.password,form.value.email,form.value.city,form.value.state, this.file);
  }

  pickImage(ev : Event){
    this.file = (ev.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewOfImage = fileReader.result as string;
    };

    fileReader.readAsDataURL(this.file);
  }

}
