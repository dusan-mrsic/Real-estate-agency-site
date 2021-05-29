import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "./welcome-screen/user.model";
//import { LoginModel } from "./login.model";

@Injectable({providedIn: "root"})
export class LogRegService{

  private token : string;
  private lastLoggedUsername : string;

  constructor(private http : HttpClient, private router : Router){
    console.log("auth service cerated");
  }

  register(name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: File){
    //const user : User = {name : name, lastname : lastName, username : username, password : password, email: email, city: city, state: state};
    const postData = new FormData();
    postData.append("name",name);
    postData.append("lastName",lastName);
    postData.append("username",username);
    postData.append("password",password);
    postData.append("email",email);
    postData.append("city",city);
    postData.append("state",state);
    console.log("USO!!!");
    postData.append("image",image, "photo");
    this.http.post<{message: string}>("http://localhost:3000/register", postData).subscribe(res => {}
    );

  }

  login(username: string, password: string){
    /*const user : LoginModel = {username: username, password: password};
    this.http.post<{token: string}>("http://localhost:3000/login", user).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        this.lastLoggedUsername = username;
        this.router.navigate(["/chat"]);
      }
    });*/
  }

  logout() {
    this.token = null;
    this.router.navigate(["/"]);
  }

  getLastLoggeduserName(){
    return this.lastLoggedUsername;
  }

  getToken(){
    console.log(this.token);
    return this.token;
  }

}
