import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { LoginModel } from "./login.model";
import { RealEstate } from "src/app/registered-user/add-real-estate/RealEstate.model";
//import { LoginModel } from "./login.model";

@Injectable({providedIn: "root"})
export class LogRegService{

  private token : string;
  private lastLoggedUsername : string;
  private user : User;
  realEstate : RealEstate;

  constructor(private http : HttpClient, private router : Router){
    console.log("auth service cerated");
  }

  register(name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: File){
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

  addRealEstate(description : string,city:string, municipality:string, address : string, houseOrApartment : string, house : string,apartment1 : string,apartment2 : string,
    images : FileList,quadrature : string, rooms : string, furnished : string, forRent : string,price : string, owner : string, username: string){
    const formData = new FormData();
    formData.append("description",description);
    formData.append("city",city);
    formData.append("municipality",municipality);
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
    formData.append("username", username);

    Array.from(images).forEach(file =>
      formData.append('files', file)
    )
    this.http.post<any>('http://localhost:3000/addRealEstate', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  changeRealEstate(_id: string, description : string,city:string, municipality:string, address : string, houseOrApartment : string, house : string,apartment1 : string,apartment2 : string,
    images : Array<string>,quadrature : string, rooms : string, furnished : string, forRent : string,price : string, owner : string, username: string){
    const formData = new FormData();

    this.realEstate  = {
      _id: _id,
      description: description,
      city: city,
      municipality: municipality,
      address: address,
      house_or_apartment: houseOrApartment,
      numberOfFloorsHouse:parseInt(house),
      floorApartment:parseInt(apartment1),
      floorsOfBuilding:parseInt(apartment2),
      images: images,
      quadrature: parseInt(quadrature),
      numberOfRooms:parseInt(rooms),
      furnished_or_unfurnished:furnished,
      forRent_or_forSale:forRent,
      price:parseInt(price),
      user_or_agency:owner,
      username: username
    }
    this.http.post<any>('http://localhost:3000/changeRealEstate', this.realEstate).subscribe(
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

  getLoggedUser(){
    return this.user;
  }

  getUser(){
    this.http.post<{user: User}>('http://localhost:3000/getUser', {username: this.getLastLoggeduserName()}).subscribe(res => {
      this.user = res.user;
    });
  }

  searchMyEstates(username: string){
    return this.http.post<Array<RealEstate>>("http://localhost:3000/searchMyEstates", {username: username});
  }




  changePersonalInfo(_id: string, name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: File){
    const user : User = {_id: _id, name : name, lastName : lastName, username : username, password : password, email: email, city: city, state: state, image: null};
    const postData = new FormData();
    console.log(name, email, lastName, image);
    postData.append("_id", _id);
    postData.append("name",name);
    postData.append("lastName",lastName);
    postData.append("username",username);
    postData.append("password",password);
    postData.append("email",email);
    postData.append("city",city);
    postData.append("state",state);
    postData.append("image",image, "photo");
    this.http.post<{message: string}>("http://localhost:3000/changePersonalInfo", postData).subscribe(res => {}
    );

  }

  changePersonalInfoWithNoImage(_id: string, name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: string){
    const user : User = {_id: _id, name : name, lastName : lastName, username : username, password : password, email: email, city: city, state: state, image: image};
    const postData = new FormData();
    postData.append("name",name);
    postData.append("lastName",lastName);
    postData.append("username",username);
    postData.append("password",password);
    postData.append("email",email);
    postData.append("city",city);
    postData.append("state",state);
    postData.append("image",image);
    console.log("bez slike");
    this.http.post<{message: string}>("http://localhost:3000/changePersonalInfoWithNoImage", user).subscribe(res => {}
    );
  }

  realEstateForInfo : RealEstate;

  setRealEstateForInfo(realEstateForInfo : RealEstate){
    this.realEstateForInfo = realEstateForInfo;
  }

  getRealEstateForInfo(){
    return this.realEstateForInfo;
  }



}
