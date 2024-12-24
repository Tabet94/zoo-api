const FoodRecord = require('../models/FoodRecord'); // MongoDB FoodRecord model

// Get all food records
exports.getAllFoodRecords = async (req, res) => {
    try {
        const records = await FoodRecord.find().populate('animal');
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add food record for an animal
exports.addFoodRecord = async (req, res) => {
    const { animal, date, time, food, quantity } = req.body;
    try {
        const newRecord = new FoodRecord({ animal, date, time, food, quantity });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get food records for a specific animal
exports.getFoodRecordsByAnimal = async (req, res) => {
    try {
        const records = await FoodRecord.find({ animal: req.params.animalId });
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
