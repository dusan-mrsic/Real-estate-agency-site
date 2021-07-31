const mongoose = require('mongoose');

var conn = mongoose.createConnection("mongodb+srv://dusan:dusan@cluster0.fhqxu.mongodb.net/UsersDB?retryWrites=true&w=majority");

const userSchema = mongoose.Schema({
  name: {type: String},
  lastName: {type: String},
  username: {type: String},
  password: {type: String},
  email:{type: String},
  city:{type: String},
  state:{type: String},
  image:{type: String},
  accepted:{type: Number}
});

var User = conn.model('User', userSchema);

module.exports = User;
