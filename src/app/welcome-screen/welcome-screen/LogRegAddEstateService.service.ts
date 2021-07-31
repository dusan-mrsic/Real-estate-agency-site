import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { LoginModel } from "./login.model";
import { RealEstate } from "src/app/registered-user/add-real-estate/RealEstate.model";
import { RealEstateOffer } from "src/app/real-estate-info/RealEstateOffer.model";
//import { LoginModel } from "./login.model";

@Injectable({providedIn: "root"})
export class LogRegService{

  private token : string;
  private lastLoggedUsername : string;
  private user : User;
  realEstate : RealEstate;
  isauth : boolean = false;

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
    postData.append("accepted", '0');
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
        this.isauth = true;
        //console.log(username);
        var sliced = username.slice(0,5);
        //console.log(sliced);
        if(sliced == "agent") this.router.navigate(["/agent"]);
        else if(sliced == "admin") this.router.navigate(["/admin"]);
        else this.router.navigate(["/user"]);
      }
      console.log(token);
    });
  }

  getAuth(){
    return this.isauth;
  }

  addRealEstate(description : string,city:string, municipality:string, address : string, houseOrApartment : string, house : string,apartment1 : string,apartment2 : string,
    images : FileList,quadrature : string, rooms : string, furnished : string, forRent : string,price : string, owner : string, username: string, accepted: string){
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
    formData.append("accepted", accepted);
    formData.append("promoted", '0');
    Array.from(images).forEach(file =>
      formData.append('files', file)
    )
    this.http.post<any>('http://localhost:3000/addRealEstate', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  changeRealEstate(_id: string, description : string,city:string, municipality:string, address : string, houseOrApartment : string, house : string,apartment1 : string,apartment2 : string,
    images : Array<string>,quadrature : string, rooms : string, furnished : string, forRent : string,price : string, owner : string, username: string, accepted: number, promoted : number){
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
      username: username,
      accepted: accepted,
      promoted: promoted
    }
    this.http.post<any>('http://localhost:3000/changeRealEstate', this.realEstate).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

  logout() {
    this.token = null;
    this.isauth = false;
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

  getAllEstates(){
    return this.http.post<Array<RealEstate>>("http://localhost:3000/getAllEstates", {});
  }


  changePersonalInfo(_id: string, name: string, lastName: string, username: string, password: string, email: string, city: string, state: string, image: File){
    const user : User = {_id: _id, name : name, lastName : lastName, username : username, password : password, email: email, city: city, state: state, image: null, accepted: 1};
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
    const user : User = {_id: _id, name : name, lastName : lastName, username : username, password : password, email: email, city: city, state: state, image: image, accepted: 1};
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

  getAllUsers(){
    return this.http.post<Array<User>>("http://localhost:3000/getAllUsers", {});
  }

  deleteUser(username : string){
    this.http.post<{message: string}>("http://localhost:3000/deleteUser", {username: username}).subscribe(res => {}
    );
  }

  acceptUser(username: string){
    this.http.post<{message: string}>("http://localhost:3000/acceptUser", {username: username}).subscribe(res => {}
    );
  }

  deleteEstate(estate : string){
    this.http.post<{message: string}>("http://localhost:3000/deleteEstate", {estate: estate}).subscribe(res => {}
    );
  }

  acceptEstate(estate: string){
    this.http.post<{message: string}>("http://localhost:3000/acceptEstate", {estate: estate}).subscribe(res => {}
    );
  }

  getAllUserRequests(){
    return this.http.post<Array<User>>("http://localhost:3000/getAllUserRequests", {});
  }

  getAllEstateRequests(){
    return this.http.post<Array<RealEstate>>("http://localhost:3000/getAllEstateRequests", {});
  }

  promote(estate: string){
    return this.http.post<{message: string}>("http://localhost:3000/promoteEstate", {estate: estate});
  }

  unpromote(estate: string){
    return this.http.post<{message: string}>("http://localhost:3000/unpromoteEstate", {estate: estate});
  }

  addOffer(idEstate : string, description: string, price: number, image: string, ownerEstate: string, offerUsername: string){
    const offer : RealEstateOffer = {_id: null, idEstate: idEstate, description: description, price: price, image: image,  ownerEstate: ownerEstate, offerUsername: offerUsername, accepted: 0}
    this.http.post<{message: string}>("http://localhost:3000/addOffer", offer).subscribe(res => {}
    );
  }

  getAllOffers(username: string){
    return this.http.post<Array<RealEstateOffer>>("http://localhost:3000/getOffers", {username: this.lastLoggedUsername});
  }

  getAllOffersAgent(){
    return this.http.post<Array<RealEstateOffer>>("http://localhost:3000/getAllOffers", {});
  }

  acceptOffer(offer : RealEstateOffer){
    this.http.post<{message: string}>("http://localhost:3000/acceptOffer", offer).subscribe(res => {}
    );
  }

  declineOffer(offer : RealEstateOffer){
    this.http.post<{message: string}>("http://localhost:3000/declineOffer", offer).subscribe(res => {}
    );
  }

  confirmOffer(offer : RealEstateOffer){
    this.http.post<{message: string}>("http://localhost:3000/confirmOffer", offer).subscribe(res => {}
    );
  }

  getAllEstatesByCity(){
    return this.http.post<string>("http://localhost:3000/getAllEstatesByCity", {});
  }

  getAllHouseForSale(){
    return this.http.post<number>("http://localhost:3000/getAllHouseForSale", {});
  }

  getAllApartmentsForSale(){
    return this.http.post<number>("http://localhost:3000/getAllApartmentsForSale", {});
  }

  getAllEstatesByPrice(){
    return this.http.post<{val1: number, val2: number, val3: number, val4: number, val5: number}>("http://localhost:3000/getAllEstatesByPrice", {});
  }

  changePassword(username: string, oldPassword : string, newPassword : string, confirmPassword : string){
    this.http.post<{message: string}>("http://localhost:3000/changePassword", {username: username, oldP : oldPassword, newP : newPassword, confirmP : confirmPassword}).subscribe(res => {
      this.logout();
    }
    );
  }

}
