const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {type: String},
  lastName: {type: String},
  username: {type: String},
  password: {type: String},
  email:{type: String},
  city:{type: String},
  state:{type: String},
  image:{type: String}
});

module.exports = mongoose.model('User', userSchema);
