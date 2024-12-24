const mongoose = require('mongoose');

const vetReportSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    details: {
        type: String,
    },
});

module.exports = mongoose.model('VetReport', vetReportSchema);
