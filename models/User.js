  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    unique: true
  },
  password: String,
  phone: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  citizenId: {
    type: String,
    unique: true
  },
});

userSchema.plugin(uniqueValidator)
const UserModel = mongoose.model('User', userSchema,'users');

module.exports = UserModel;