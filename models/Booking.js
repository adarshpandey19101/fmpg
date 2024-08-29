const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: [true, 'Path `mobile` is required.'],
  },
  startDate: {
    type: Date,
    required: [true, 'Path `startDate` is required.'],
  },
  endDate: {
    type: Date,
    required: [true, 'Path `endDate` is required.'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  roomType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'room',
    required: true,
  },
  specialRequest: {
    type: String,
    required: false,
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Confirmed' 
  },
  username: { 
    type: String,
    required: true 
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
