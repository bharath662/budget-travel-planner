const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  origin: { type: String, required: true },
  states: [String],
  districts: [String],
  places: [String],
  transportation: {
    type: { type: String },
    class: { type: String }
  },
  accommodation: {
    hotelRating: { type: String },
    foodType: { type: String }
  },
  startDate: String,
  endDate: String,
  adults: Number,
  children: Number,
  totalCost: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', TripSchema);
