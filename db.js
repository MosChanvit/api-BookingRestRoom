const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BookingRestRoom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});