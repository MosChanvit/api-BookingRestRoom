  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator')


const BookingSchema = new Schema({
  id_user: String,
  id_restRoom: String,
  Booking_numberofroom: String
});

BookingSchema.plugin(uniqueValidator)
const BookingModel = mongoose.model('Booking', BookingSchema,'Booking');

module.exports = BookingModel;