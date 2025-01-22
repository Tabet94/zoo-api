const FoodRecord = require('../models/FoodRecord'); // MongoDB FoodRecord model
const Animal = require('../models/Animal')
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
    try {
           const { animalId } = req.params; // Extract animalId from the URL
           const recordData = { ...req.body, animal: animalId };
   
           
           const newRecord = await FoodRecord.create(recordData);
   
           
           await Animal.findByIdAndUpdate(
               animalId,
               { $push: { foodRecords: newRecord._id } },
               { new: true }
           );
   
           res.status(201).json(newRecord);
           
       } catch (error) {
           res.status(400).json({ message: error.message });
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
