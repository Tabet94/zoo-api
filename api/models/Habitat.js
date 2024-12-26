const mongoose = require('mongoose');

const habitatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
  imagesUrl: [{ type: String }],
});

module.exports = mongoose.model('Habitat', habitatSchema);
