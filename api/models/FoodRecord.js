const mongoose = require('mongoose');

const foodRecordSchema = new mongoose.Schema({
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    date: {
        type: Date,
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
});

module.exports = mongoose.model('FoodRecord', foodRecordSchema);
