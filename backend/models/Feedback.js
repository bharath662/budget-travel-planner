const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
