import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { LoginModel } from "./login.model";
//import { LoginModel } from "./login.model";

@Injectable({providedIn: "root"})
export class LogRegService{

  private token : string;
  private lastLoggedUsername : string;

  constructor(private http : HttpClient, private router : Router){
    console.log("auth service cerated");
  }

  register(name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: File){
    const user : User = {name : name, lastname : lastName, username : username, password : password, email: email, city: city, state: state};
    const postData = new FormData();
    postData.append("name",name);
    postData.append("lastName",lastName);
    postData.append("username",username);
    postData.append("password",password);
    postData.append("email",email);
    postData.append("city",city);
    postData.append("state",state);
    postData.append("image",image, "photo");
    this.http.post<{message: string}>("http://localhost:3000/register", postData).subscribe(res => {}
    );

  }

  login(username: string, password: string){
    const user : LoginModel = {username: username, password: password};
    this.http.post<{token: string}>("http://localhost:3000/login", user).subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        this.lastLoggedUsername = username;
        console.log(username);
        var sliced = username.slice(0,5);
        console.log(sliced);
        if(sliced == "agent") this.router.navigate(["/agent"]);
        else if(sliced == "admin") this.router.navigate(["/admin"]);
        else this.router.navigate(["/user"]);
      }
    });
  }

  addRealEstate(description : string, address : string, houseOrApartment : string, house : string,apartment1 : string,apartment2 : string,
    images : FileList,quadrature : string, rooms : string, furnished : string, forRent : string,price : string, owner : string){
    const formData = new FormData();
    formData.append("description",description);
    formData.append("address",address);
    formData.append("houseOrApartment",houseOrApartment);
    formData.append("house",house);
    formData.append("apartment1",apartment1);
    formData.append("apartment2",apartment2);
    formData.append("quadrature",quadrature);
    formData.append("rooms",rooms);
    formData.append("furnished",furnished);
    formData.append("forRent",forRent);
    formData.append("price",price);
    formData.append("owner",owner);

    Array.from(images).forEach(file =>
      formData.append('files', file)
    )
    this.http.post<any>('http://localhost:3000/addRealEstate', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
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
