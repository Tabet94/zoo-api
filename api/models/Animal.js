const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  habitat: { type: mongoose.Schema.Types.ObjectId, ref: 'Habitat' },
  race: { type: String, required: true },
  imagesUrl: [{ type: String }],
  vetReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VetReport' }], 
});


module.exports = mongoose.model('Animal', animalSchema);
