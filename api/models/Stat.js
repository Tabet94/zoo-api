const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Stat', statSchema);
