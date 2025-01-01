const mongoose = require('mongoose');

const vetReportSchema = new mongoose.Schema({
   
  state: { type: String, required: true },
  food: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, required: true },
  details: { type: String, required: true },
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal', required: true },
});

module.exports = mongoose.model('VetReport', vetReportSchema);
