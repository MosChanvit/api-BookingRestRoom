  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')


const restroomSchema = new Schema({
  name: String,
  location: {
    latitude: { type: Number },
    longitude: { type: Number } 
  },
  price: Number,
  left: Number,
  isActive: Boolean
});

restroomSchema.plugin(uniqueValidator)
const restRoomModel = mongoose.model('restRoom', restroomSchema,'restRoom');

module.exports = restRoomModel;