const mongoose = require('mongoose');

var conn1 = mongoose.createConnection("mongodb+srv://dusan:dusan@cluster0.fhqxu.mongodb.net/RealEstateOfferDB?retryWrites=true&w=majority");

const userSchema = mongoose.Schema({
  idEstate: {type:String},
  description: {type: String},
  price: {type: Number},
  image: {type: String},
  ownerEstate: {type:String},
  offerUsername : {type:String},
  accepted : {type: Number}
});

var RealEstateOffer = conn1.model('RealEstateOffer', userSchema);

module.exports = RealEstateOffer;
