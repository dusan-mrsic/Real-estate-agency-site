import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LogRegService } from '../LogRegService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private logregservice : LogRegService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm){
    this.logregservice.login(form.value.username, form.value.password);
  }

}
