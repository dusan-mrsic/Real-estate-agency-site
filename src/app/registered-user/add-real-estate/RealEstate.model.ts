export class RealEstate{
  _id: string;
  description: string;
  city: string;
  municipality: string;
  address: string;
  house_or_apartment: string;
  numberOfFloorsHouse:number;
  floorApartment:number;
  floorsOfBuilding:number;
  images: Array<string>;
  quadrature: number;
  numberOfRooms:number;
  furnished_or_unfurnished:string;
  forRent_or_forSale:string;
  price:number;
  user_or_agency:string;
  username: string;
  accepted: number;
  promoted: number;
}
