import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RealEstate } from '../registered-user/add-real-estate/RealEstate.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private http : HttpClient) { }

  search(city: string, priceMin: number, priceMax: number){
    if(!priceMin) priceMin = 0;
    if(!priceMax) priceMax = 9999999999;
    const data = {city: city, priceMin: priceMin, priceMax: priceMax};
    return this.http.post<Array<RealEstate>>("http://localhost:3000/searchEstates", data);
  }

}
