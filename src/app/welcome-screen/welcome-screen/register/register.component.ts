import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from '../LogRegService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  file : File;
  previewOfImage : string;

  constructor(private logRegService: LogRegService) { }

  ngOnInit(): void {
  }

  onRegister(form : NgForm){
    this.logRegService.register(form.value.name, form.value.lastname, form.value.username, form.value.password,form.value.email,form.value.city,form.value.state, this.file);
  }

  pickImage(ev : Event){
    console.log("USO");
    this.file = (ev.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.previewOfImage = fileReader.result as string;
    };
    fileReader.readAsDataURL(this.file);
  }

}
