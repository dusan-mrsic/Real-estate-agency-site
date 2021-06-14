const mongoose = require('mongoose');

var conn1 = mongoose.createConnection("mongodb+srv://dusan:dusan@cluster0.fhqxu.mongodb.net/RealEstateDB?retryWrites=true&w=majority");

const userSchema = mongoose.Schema({
  description: {type: String},
  address: {type: String},
  house_or_apartment: {type: String},
  numberOfFloorsHouse:{type: String},
  floorApartment:{type: String},
  floorsOfBuilding:{type: String},
  images: {type: Array},
  quadrature:{type: String},
  numberOfRooms:{type: String},
  furnished_or_unfurnished:{type: String},
  forRent_or_forSale:{type: String},
  price:{type: String},
  user_or_agency:{type: String}


});

var RealEstate = conn1.model('RealEstate', userSchema);

module.exports = RealEstate;
