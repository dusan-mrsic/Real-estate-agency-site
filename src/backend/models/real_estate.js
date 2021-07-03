const mongoose = require('mongoose');

var conn1 = mongoose.createConnection("mongodb+srv://dusan:dusan@cluster0.fhqxu.mongodb.net/RealEstateDB?retryWrites=true&w=majority");

const userSchema = mongoose.Schema({
  description: {type: String},
  city: {type: String},
  municipality: {type: String},
  address: {type: String},
  house_or_apartment: {type: String},
  numberOfFloorsHouse:{type: Number},
  floorApartment:{type: Number},
  floorsOfBuilding:{type: Number},
  images: {type: Array},
  quadrature:{type: Number},
  numberOfRooms:{type: Number},
  furnished_or_unfurnished:{type: String},
  forRent_or_forSale:{type: String},
  price:{type: Number},
  user_or_agency:{type: String}


});

var RealEstate = conn1.model('RealEstate', userSchema);

module.exports = RealEstate;
