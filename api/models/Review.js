const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  pseudo: { type: String, required: true },
  comment: { type: String, required: true },
  isVisible: { type: Boolean, default: false },
});

module.exports = mongoose.model('Review', reviewSchema);
